import React, {useEffect, useRef, useState} from 'react';
import cl from './ProductPage.module.css';
import IButton from "../../Components/UI/IButton/IButton";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import img from '../../Assets/Pictures/TestProduct/picture.png';
import arrow from '../../Assets/Pictures/arrow-breadcrumbs.svg';
import arrowfilter from '../../Assets/Pictures/arrow-filter.svg';
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
import {useParams} from "react-router-dom";

const ProductPage = () => {
    const targetRef = useRef();
    const params = useParams();
    const [filterOpen, setFilterOpen] = useState(false);
    const [error, setError] = useState(false)
    const [errorMore, setErrorMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const filtercontainer = useRef();
    const [width] = useWindowSize();

    const [dataFilter, setDataFilter] = useState()
    const [errorFilter, setErrorFilter] = useState()

    useScrollbar(filtercontainer);

    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: `${data.parent_title}`, path: '/catalog/subcatalog' },
    ];

    const baseUrl = "http://alexaksa.beget.tech/";

    useEffect(() => {
        // URL API ресурса
        const apiURL = `http://alexaksa.beget.tech/productapi.html?id=${params.id}`;
        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setData(response.data); // Устанавливаем данные из API в состояние
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setErrorMore(error.message); // или error.toString()
                setLoading(false)
                setError(true);
            })
    }, []);

    useEffect(() => {
        // URL API ресурса
        const apiURL = 'http://alexaksa.beget.tech/api.html';
        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setDataFilter(response.data); // Устанавливаем данные из API в состояние
                setIsOpen(response.data.map(() => true))
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
                setErrorFilter(true);
            })
    }, []); // Пустой массив зависимостей - useEffect выполнится один раз при монтировании компонента


    useEffect(() => {
        console.log(data.product_features)
    }, [data, setData]);

    const toggleSection = (index) => {
        setIsOpen(prevState =>
            prevState.map((state, idx) => idx === index ? !state : state)
        );
    };

    const [active, setActive] = useState(1);

    const testimages = [img, img, img, img];

    const moreFeatures = () => {
        setActive(2); // Устанавливаем активную вкладку
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Прокручиваем к .buttons
    };

    const moreDescription = () => {
        setActive(1); // Устанавливаем активную вкладку
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Прокручиваем к .buttons
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
                            <div className={`${cl.background}`} onClick={!setFilterOpen} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            }
            <div className={cl.mainBlock}>
                <div className={cl.breadcrumbs}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                {
                    !errorFilter && !loading &&
                    <>
                        {
                            width > 960 &&
                            <div className={`${cl.filter} ${filterOpen ? cl.open : ''}`}>
                                <div className={cl.buttonFilter} onClick={() => setFilterOpen(!filterOpen)}>
                                    <img src={doubleArrow} alt="arrow" />
                                    <span>Категории</span>
                                </div>
                                <div ref={filtercontainer} className={cl.filterMainContainer}>
                                    {dataFilter.map((category, index) => (
                                        <div className={cl.filterItem} key={index}>
                                            <div className={`${cl.mainItem} ${active[0] === category.name ? cl.active : ''}`}
                                                 onClick={() => toggleSection(index)}>
                                                <span>{category.pagetitle}</span>
                                                <img className={isOpen[index] ? '' : cl.rotate}
                                                     src={arrowdark} alt='arrow' />
                                            </div>
                                            <div className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                                {category.children.map((item, index) => (
                                                    <div className={`${cl.item} ${active[1] === item ? cl.active : ''}`}
                                                         key={index}>
                                                        {item.pagetitle}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </>
                }

                {loading && <>
                    <div className={'alert'}>Загрузка...</div>
                    <div className={cl.nutipa}/>
                </>}
                {loading === false && error === false && <>
                    <div className={cl.productInfo}>
                        <div className={cl.title}>
                            <h1>{data.pagetitle}</h1>
                            <IButton color={'border'} className={cl.button}>Узнать стоимость</IButton>
                        </div>
                        {width > 960 ?
                            <div className={cl.productContainer}>
                                <div className={cl.images}>
                                    <img className={cl.mainImage} src={baseUrl + data.product_image} alt="product" />
                                    <div className={cl.imagesContainer}>
                                        {testimages.map((img, index) => (
                                            <img className={cl.microImage} src={img} key={index} alt={'product'} />
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
                                            {data.product_features.slice(0, 5).map((feature, index) => (
                                                <div className={cl.feature} key={index}>
                                                    <div>{feature[0]}</div>
                                                    <div>{feature[1]}</div>
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
                                        <img className={cl.mainImage} src={img} alt="product" />
                                        <div className={cl.imagesContainer}>
                                            {testimages.map((img, index) => (
                                                <img className={cl.microImage} src={img} key={index} alt={'product'} />
                                            ))}
                                        </div>
                                    </div> :
                                    <div className={cl.images}>
                                        <Slider {...settings}>
                                            {testimages.map((img, index) => (
                                                <div className={cl.sliderItem} key={index}>
                                                    <img className={cl.mainImage} src={img} alt={'product'} />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                }
                                <div className={cl.info}>
                                    <div className={cl.description}>
                                        <p>Универсальное решение для промышленных измерений различных видов жидкостей (вода,
                                            кислоты, щелочи и т.д.).</p>
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
                                        {data.product_features.slice(0, 5).map((feature, index) => (
                                            <div className={cl.feature} key={index}>
                                                <div className={cl.name}>{feature.name}</div>
                                                <div>{feature.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }

                        <div className={cl.full}>
                            <div className={cl.scrollHelper} ref={targetRef}/>
                            <div className={cl.buttons}> {/* Привязываем ref к .buttons */}
                                <button onClick={() => setActive(1)} className={active === 1 ? cl.active : ''}>Отличительные
                                    особенности
                                </button>
                                <button onClick={() => setActive(2)}
                                        className={active === 2 ? cl.active : ''}>Характеристики
                                </button>
                                <button onClick={() => setActive(3)}
                                        className={active === 3 ? cl.active : ''}>Документация
                                </button>
                            </div>
                            {
                                active === 1 && <MoreDescription content={data.product_description} />
                            }
                            {
                                active === 2 && <MoreFeatures content={data.product_features} />
                            }
                            {
                                active === 3 && <MoreDocumentation />
                            }
                        </div>
                    </div>
                </>}
                {
                    error && <>
                    <div className={'alert'}>Ошибка: {errorMore}</div>
                    <div className={'nutipa'}/>
                </>
                }
            </div>
        </div>
    );
};

export default ProductPage;