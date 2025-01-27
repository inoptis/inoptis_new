import React, {useRef, useState} from 'react';
import cl from './ProductPage.module.css'
import IButton from "../../Components/UI/IButton/IButton";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import img from '../../Assets/Pictures/TestProduct/picture.png'
import arrow from '../../Assets/Pictures/arrow-breadcrumbs.svg'
import doubleArrow from '../../Assets/Pictures/double-arrow.svg'
import MoreDescription from "../../Components/Blocks/MoreInfoBlocks/MoreDescription";
import MoreFeatures from "../../Components/Blocks/MoreInfoBlocks/MoreFeatures";
import MoreDocumentation from "../../Components/Blocks/MoreInfoBlocks/MoreDocumentation";
const ProductPage = () => {

    const targetRef = useRef();
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Ультразвуковые расходомеры жидкости (врезные)', path:'/catalog/subcatalog'},
        { title: 'ТЭК-МПУ-Н-…-304Т — магнитный указатель уровня надставной с футеровкой для агрессивных сред', path:'/catalog/subcatalog/product'},
    ];

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

    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <div className={cl.breadcrumbs}>
                    <Breadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <div className={cl.filter}>
                    <img src={doubleArrow} alt="arrow"/>
                    <span>Категории</span>
                </div>
                <div className={cl.productInfo}>
                    <div className={cl.title}>
                        <h1>ТЭК-МПУ-Н-…-304Т — магнитный указатель уровня надставной с футеровкой для агрессивных
                            сред</h1>
                        <IButton color={'border'} className={cl.button}>Узнать стоимость</IButton>
                    </div>
                    <div className={cl.productContainer}>
                        <div className={cl.images}>
                            <img src={img} alt="product"/>
                            <div className={cl.imagesContainer}>
                                {testimages.map((img, index) => (
                                    <img src={img} key={index} alt={'product'}/>
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
                                            <div>{feature.name}</div>
                                            <div>{feature.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
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