import React, {useRef, useState} from 'react';
import cl from './ProductPage.module.css'
import IButton from "../../Components/UI/IButton/IButton";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import img from '../../Assets/Pictures/TestProduct/picture.png'
import arrow from '../../Assets/Pictures/arrow-breadcrumbs.svg'
import arrowfilter from '../../Assets/Pictures/arrow-filter.svg'
import doubleArrow from '../../Assets/Pictures/double-arrow.svg'
import MoreDescription from "../../Components/Blocks/MoreInfoBlocks/MoreDescription";
import MoreFeatures from "../../Components/Blocks/MoreInfoBlocks/MoreFeatures";
import MoreDocumentation from "../../Components/Blocks/MoreInfoBlocks/MoreDocumentation";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {testCategories} from "../../utils/TestCategories";
import arrowdark from "../../Assets/Pictures/arrow-filter-dark.svg";
import {useScrollbar} from "../../Hooks/useScrollbar";
import {useWindowSize} from "../../Hooks/useWindowSize";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ProductPage = () => {

    const targetRef = useRef();
    const [filterOpen, setFilterOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(testCategories.map(() => true));
    const filtercontainer = useRef();
    const [width, ] = useWindowSize()
    useScrollbar(filtercontainer)

    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Ультразвуковые расходомеры жидкости (врезные)', path:'/catalog/subcatalog'},
    ];

    const toggleSection = (index) => {
        setIsOpen(prevState =>
            prevState.map((state, idx) => idx === index ? !state : state)
        );
    };

    const [active, setActive] = useState(1)

    const testimages = [img,img,img,img]

    const testFeatures = [
        {
            name:'Диапазон значений Ду трубопровода',
            value:'DN4...DN2000'
        },
        {
            name:'Направление потока',
            value:'прямое, реверсивное'
        },
        {
            name:'t° контролируемой жидкости',
            value:'450 кг/м³ '
        },
        {
            name:'Давление в трубопроводе',
            value:'от 1 до 4 МПа (до 32 МПа)'
        },
        {
            name:'t° окружающей среды',
            value:'от -40 до 60 °С (до -70 °С)'
        },
    ]

    const moreFeatures = () => {
        setActive(2); // Ваш метод
    };
    const moreDescription = () => {
        setActive(1); // Ваш метод
    };

    const settings = {
        dots: true, // Показывать точки-индикаторы слайдов
        infinite: true, // Бесконечное зацикливание слайдов
        speed: 500, // Скорость смены слайдов
        slidesToShow: 1, // Показывать по одному слайду
        slidesToScroll: 1, // Прокручивать по одному слайду
        arrows: false, // Отключить стрелки навигации
        swipeToSlide: true, // Позволить свайпинг для навигации
        adaptiveHeight: true // Автоматически подстраивать высоту слайдера под элемент слайда
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
                            <div className={`${cl.background}`} />
                        </CSSTransition>
                    )}
                </TransitionGroup>
            }
            <div className={cl.mainBlock}>
                <div className={cl.breadcrumbs}>
                    <Breadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                {
                    width > 960 &&
                    <div className={`${cl.filter} ${filterOpen ? cl.open : ''}`}>
                        <div className={cl.buttonFilter} onClick={() => setFilterOpen(!filterOpen)}>
                            <img src={doubleArrow} alt="arrow"/>
                            <span>Категории</span>
                        </div>
                        <div ref={filtercontainer} className={cl.filterMainContainer}>
                            {testCategories.map((category, index) => (
                                <div className={cl.filterItem} key={index}>
                                    <div className={`${cl.mainItem} ${active[0] === category.name ? cl.active : ''}`}
                                         onClick={() => toggleSection(index)}>
                                        <span>{category.name}</span>
                                        <img className={isOpen[index] ? '' : cl.rotate}
                                             src={active[0] === category.name ? arrowfilter : arrowdark} alt='arrow'/>
                                    </div>
                                    <div className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                        {category.children.map((item, index) => (
                                            <div className={`${cl.item} ${active[1] === item ? cl.active : ''}`}
                                                 key={index}>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                <div className={cl.productInfo}>
                    <div className={cl.title}>
                        <h1>ТЭК-МПУ-Н-…-304Т — магнитный указатель уровня надставной с футеровкой для агрессивных
                            сред</h1>
                        <IButton color={'border'} className={cl.button}>Узнать стоимость</IButton>
                    </div>
                    {width > 960 ?
                        <div className={cl.productContainer}>
                            <div className={cl.images}>
                                <img className={cl.mainImage} src={img} alt="product"/>
                                <div className={cl.imagesContainer}>
                                    {testimages.map((img, index) => (
                                        <img className={cl.microImage} src={img} key={index} alt={'product'}/>
                                    ))}
                                </div>
                            </div>
                            <div className={cl.info}>
                                <div className={cl.description}>
                                    <p>Универсальное решение для промышленных измерений различных видов жидкостей (вода,
                                        кислоты, щелочи и т.д.).</p>
                                    <div className={cl.more} onClick={moreDescription}>
                                        <span>Подробнее</span>
                                        <img src={arrow} alt="arrow"/>
                                    </div>
                                </div>
                                <div className={cl.featureBlock}>
                                    <div className={cl.featureTitle}>
                                        <h3>Характеристики</h3>
                                        <div className={cl.more} onClick={moreFeatures}>
                                            <span>Все характеристики</span>
                                            <img src={arrow} alt="arrow"/>
                                        </div>
                                    </div>
                                    <div className={cl.featureContainer}>
                                        {testFeatures.map((feature, index) => (
                                            <div className={cl.feature} key={index}>
                                                <div >{feature.name}</div>
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
                                    <img className={cl.mainImage} src={img} alt="product"/>
                                    <div className={cl.imagesContainer}>
                                        {testimages.map((img, index) => (
                                            <img className={cl.microImage} src={img} key={index} alt={'product'}/>
                                        ))}
                                    </div>
                                </div> :
                                <div className={cl.images}>
                                    <Slider {...settings}>
                                        {testimages.map((img, index) => (
                                            <div className={cl.sliderItem} key={index}>
                                                <img className={cl.mainImage} src={img} alt={'product'}/>
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
                                        <img src={arrow} alt="arrow"/>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.featureBlock}>
                                <div className={cl.featureTitle}>
                                    <h3>Характеристики</h3>
                                    <div className={cl.more} onClick={moreFeatures}>
                                        <span>Все характеристики</span>
                                        <img src={arrow} alt="arrow"/>
                                    </div>
                                </div>
                                <div className={cl.featureContainer}>
                                    {testFeatures.map((feature, index) => (
                                        <div className={cl.feature} key={index}>
                                            <div className={cl.name}>{feature.name}</div>
                                            <div>{feature.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }

                    <div className={cl.full} ref={targetRef}>
                        <div className={cl.buttons}>
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
                            active === 1 && <MoreDescription/>
                        }
                        {
                            active === 2 && <MoreFeatures/>
                        }
                        {
                            active === 3 && <MoreDocumentation/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;