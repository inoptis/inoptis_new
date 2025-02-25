//@ts-check

import React, { useEffect, useRef, useState } from 'react';
import cl from './ProductPage.module.css';
import IButton from "../../Components/UI/IButton/IButton";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import arrow from '../../Assets/Pictures/arrow-breadcrumbs.svg';
import doubleArrow from '../../Assets/Pictures/double-arrow.svg';
import MoreDescription from "../../Components/Blocks/MoreInfoBlocks/MoreDescription";
import MoreFeatures from "../../Components/Blocks/MoreInfoBlocks/MoreFeatures";
import MoreDocumentation from "../../Components/Blocks/MoreInfoBlocks/MoreDocumentation";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import arrowdark from "../../Assets/Pictures/arrow-filter-dark.svg";
import { useScrollbar } from "../../Hooks/useScrollbar";
import { useWindowSize } from "../../Hooks/useWindowSize";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../Components/UI/Modal/Modal";
import Form from "../../Components/UI/Form/Form";
import Loader from "../../Components/Loader/Loader";

const ProductPage = () => {
    const navigate = useNavigate();
    const targetRef = useRef();
    const params = useParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMore, setErrorMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null); // изменено на null
    const [isOpen, setIsOpen] = useState(null);
    const filtercontainer = useRef();
    const imageContainer = useRef();
    const [width] = useWindowSize();
    const [usedImg, setUsedImg] = useState('');
    const [dataFilter, setDataFilter] = useState(null);
    const [errorFilter, setErrorFilter] = useState();
    useScrollbar(filtercontainer);
    useScrollbar(imageContainer);

    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: `${data?.parent_title}`, path: '/catalog/subcatalog' },
    ];

    const baseUrl = "/";

    const [modal, setModal] = useState(false);

    const closeModal = () => {
        setModal(false);
    };

    const openModal = () => {
        setModal(true);
    };

    useEffect(() => {
        const apiURL = `/productapi.html?alias=${params.id}`;
        axios.get(apiURL)
            .then(response => {
                setData(response.data); // Устанавливаем данные из API в состояние
                setLoading(false);
                setUsedImg(baseUrl + response.data.product_image?.fieldValue?.[0]?.image || 'default-image.jpg'); // Защищаем доступ к полям
            })
            .catch(error => {
                console.log(error);
                setErrorMore(error.message);
                setLoading(false);
                setError(true);
            });
    }, [params]);

    useEffect(() => {
        const apiURL = '/api.html';
        axios.get(apiURL)
            .then(response => {
                setDataFilter(response.data);
                setIsOpen(response.data.map(() => true));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setErrorFilter(true);
            });
    }, []);

    useEffect(() => {
        if (filterOpen) {
            document.body.classList.add('no-scroll');
            return () => {
                document.body.classList.remove('no-scroll');
            }
        }
    }, [filterOpen]);

    const toggleSection = (index) => {
        setIsOpen(prevState =>
            prevState.map((state, idx) => idx === index ? !state : state)
        );
    };

    const [active, setActive] = useState(1);

    const moreFeatures = () => {
        setActive(2);
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const moreDescription = () => {
        setActive(1);
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const closeFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        adaptiveHeight: true
    };

    return (
        <>
            {modal &&
                <Modal close={closeModal}>
                    <Form/>
                </Modal>
            }
            <div className={'page'}>
                {width > 960 &&
                    <TransitionGroup>
                        {filterOpen && (
                            <CSSTransition
                                key="background"
                                classNames="fadePages"
                                timeout={300}
                                unmountOnExit
                            >
                                <div className={`${cl.background}`} onClick={closeFilter} />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                }
                <div className={cl.mainBlock}>
                    <div className={cl.breadcrumbs}>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>

                    { !errorFilter && !loading && dataFilter !== null &&
                        <div>
                            {width > 960 &&
                                <div className={`${cl.helper} ${filterOpen ? cl.open : ''}`}>
                                    <div className={cl.buttonFilter} onClick={closeFilter}>
                                        <img className={filterOpen ? '' : cl.rotate} src={doubleArrow} alt="arrow"/>
                                        <span>Категории</span>
                                    </div>
                                    <div className={cl.filterAbsolute}>
                                        <div ref={filtercontainer} className={cl.filterMainContainer}>
                                            {dataFilter.map((category, index) => (
                                                <div className={cl.filterItem} key={index}>
                                                    <div className={`${cl.mainItem}`} onClick={() => toggleSection(index)}>
                                                        <span>{category.pagetitle}</span>
                                                        <img className={isOpen[index] ? '' : cl.rotate} src={arrowdark} alt='arrow'/>
                                                    </div>
                                                    <div className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                                        {category.children.map((item, index) => (
                                                            <div className={`${cl.item}`} key={index} onClick={() => navigate(`/catalog/subcatalog?id=${item.id}`)}>
                                                                {item.pagetitle}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                    <CSSTransition
                        in={loading}
                        timeout={100} // Длительность анимации
                        classNames="fadefast"
                        unmountOnExit
                    >
                        <Loader />
                    </CSSTransition>
                    {loading === false && error === false && data && <div className={cl.productInfo}>
                        <div className={cl.title}>
                            <h1>{data.pagetitle}</h1>
                            <IButton onClick={openModal} color={'border'} className={cl.button}>Узнать стоимость</IButton>
                        </div>
                        {width > 960 ?
                            <div className={cl.productContainer}>
                                <div className={cl.images}>
                                    <img className={cl.mainImage} src={usedImg} alt="product" />
                                    <div className={cl.imagesContainer} ref={imageContainer}>
                                        {data.product_image?.fieldValue?.map((img, index) => (
                                            <div className={`${cl.blockImage} ${usedImg === baseUrl + img.image ? cl.selected : ''}`} onClick={() => setUsedImg(baseUrl + img.image)}>
                                                <img className={`${cl.microImage}`} src={baseUrl + img.image} key={index} alt={'product'} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={cl.info}>
                                    <div className={cl.description}>
                                        <p>{data.product_content}</p>
                                        <div className={cl.more} onClick={moreDescription}>
                                            <span>Подробнее</span>
                                            <img src={arrow} alt="arrow" />
                                        </div>
                                    </div>
                                    <div className={cl.featureBlock}>
                                        <div className={cl.featureTitle}>
                                            <h3>Характеристики</h3>
                                            <div className={cl.more} onClick={moreFeatures}>
                                                <span>Все характеристики</span>
                                                <img src={arrow} alt="arrow" />
                                            </div>
                                        </div>
                                        <div className={cl.featureContainer}>
                                            {data.product_features?.fieldValue?.slice(0, 5).map((feature, index) => (
                                                <div className={cl.feature} key={index}>
                                                    <div>{feature.key}</div>
                                                    <div>{feature.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={cl.productContainer}>
                                {width > 560
                                    ? <div className={cl.images}>
                                        <img className={cl.mainImage} src={usedImg} alt="product" />
                                        <div className={cl.imagesContainer}>
                                            {data.product_image?.fieldValue?.map((img, index) => (
                                                <div className={`${cl.blockImage} ${usedImg === baseUrl + img.image ? cl.selected : ''}`} onClick={() => setUsedImg(baseUrl + img.image)}>
                                                    <img className={`${cl.microImage}`} src={baseUrl + img.image} key={index} alt={'product'} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    : <div className={cl.images}>
                                        <Slider {...settings}>
                                            {data.product_image?.fieldValue?.map((img, index) => (
                                                <div className={cl.sliderItem} key={index}>
                                                    <img className={cl.mainImage} src={baseUrl + img.image} alt={'product'} />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                }
                                <div className={cl.info}>
                                    <div className={cl.description}>
                                        <p>Универсальное решение для промышленных измерений различных видов жидкостей (вода, кислоты, щелочи и т.д.).</p>
                                        <div className={cl.more} onClick={moreDescription}>
                                            <span>Подробнее</span>
                                            <img src={arrow} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className={cl.featureBlock}>
                                    <div className={cl.featureTitle}>
                                        <h3>Характеристики</h3>
                                        <div className={cl.more} onClick={moreFeatures}>
                                            <span>Все характеристики</span>
                                            <img src={arrow} alt="arrow" />
                                        </div>
                                    </div>
                                    <div className={cl.featureContainer}>
                                        {data.product_features?.fieldValue?.slice(0, 5).map((feature, index) => (
                                            <div className={cl.feature} key={index}>
                                                <div className={cl.name}>{feature[0]}</div>
                                                <div>{feature[1]}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }

                        <div className={cl.full}>
                            <div className={cl.scrollHelper} ref={targetRef} />
                            <div className={cl.buttons}>
                                <button onClick={() => setActive(1)} className={active === 1 ? cl.active : ''}>Отличительные особенности</button>
                                <button onClick={() => setActive(2)} className={active === 2 ? cl.active : ''}>Характеристики</button>
                                <button onClick={() => setActive(3)} className={active === 3 ? cl.active : ''}>Документация</button>
                            </div>
                            {active === 1 && <MoreDescription content={data.product_description} />}
                            {active === 2 && <MoreFeatures content={data.product_features?.fieldValue}  />}
                            {active === 3 && <MoreDocumentation content={data.product_file} />}
                        </div>
                    </div>}

                    {error && <div className={'alert'}>Ошибка: {errorMore}</div>}
                </div>
            </div>
        </>
    );
};

export default ProductPage;
