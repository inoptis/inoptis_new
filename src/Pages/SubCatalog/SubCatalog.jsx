import React, {useEffect, useState} from 'react';
import cl from './SubCatalog.module.css'
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ProductCard from "../../Components/ProductCard/ProductCard";
import {testCategories} from "../../utils/TestCategories";
import arrow from '../../Assets/Pictures/arrow-filter.svg'
import arrowdark from '../../Assets/Pictures/arrow-filter-dark.svg'
import axios from "axios";
const SubCatalog = () => {
    const [active, setActive] = useState(['', ''])
    const [isOpen, setIsOpen] = useState(testCategories.map(() => false));
    const toggleSection = (index) => {
        setIsOpen(prevState =>
            prevState.map((state, idx) => idx === index ? !state : state)
        );
    };
    const clickItem = (category, item) => {
        setActive([category, item])
    };

    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Ультразвуковые расходомеры жидкости (врезные)', path:'/catalog/subcatalog'}
    ];

    const [errorFilter, setErrorFilter] = useState(false)
    const [errorProducts, setErrorProducts] = useState(false)
    const [errorMoreFilter, setErrorMoreFilter] = useState(false)
    const [errorMoreProducts, setErrorMoreProducts] = useState(false)
    const [loading, setLoading] = useState(true)
    const [dataFilter, setDataFilter] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        // URL API ресурса
        const apiURL = 'http://alexaksa.beget.tech/api.html';
        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setDataFilter(response.data); // Устанавливаем данные из API в состояние
                setLoading(false)
                setActive(response.data[0], response.data[0].children[0])
            })
            .catch(error => {
                console.log(error);
                setErrorMoreFilter(error.message); // или error.toString()
                setLoading(false)
                setErrorFilter(true);
            })
    }, []); // Пустой массив зависимостей - useEffect выполнится один раз при монтировании компонента

    useEffect(() => {
        // URL API ресурса
        const apiURL = `http://alexaksa.beget.tech/categoryproductsapi.html?category_id=${active[1].id}`;
        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setDataProducts(response.data); // Устанавливаем данные из API в состояние
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setErrorMoreProducts(error.message); // или error.toString()
                setLoading(false)
                setErrorProducts(true);
            })
    }, [active, setActive]);

    return (
        <div className='page'>
            <div className={cl.mainBlock}>
                {loading && <>
                    <div className={'alert'}>Загрузка...</div>
                    <div className={cl.nutipa}/>
                </>}
                {!loading && !errorFilter &&
                    <>
                        <Breadcrumbs breadcrumbs={breadcrumbs}/>
                        <h1>Ультразвуковые расходомеры жидкости (врезные)</h1>
                        <p>Магнитные указатели уровня жидкости основаны на принципе перемещения магнитного индикатора внутри трубки и обеспечивают надежное и ясное отображение уровня жидкости в резервуарах.</p>
                        <div className={cl.catalogContainer}>
                            <div className={cl.filter}>
                                {dataFilter.map((category, index) => (
                                    <div className={cl.filterItem} key={index}>
                                        <div className={`${cl.mainItem} ${active[0].id === category.id ? cl.active : ''}`} onClick={() => toggleSection(index)}>
                                            <span>{category.pagetitle}</span>
                                            <img className={isOpen[index] ?  '' : cl.rotate} src={active[0].id === category.id ? arrow : arrowdark} alt='arrow'/>
                                        </div>
                                        <div className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                            {category.children.map((item, index) => (
                                                <div className={`${cl.item} ${active[1].id === item.id ? cl.active : ''}`} key={index} onClick={() => clickItem(category, item)}>
                                                    {item.pagetitle}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!loading && !errorProducts &&
                                <div className={cl.productContainer}>
                                    {dataProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} category={active[1].pagetitle}/>
                                    ))}
                                </div>
                            }
                        </div>
                    </>
                }
                {
                    (errorFilter || errorProducts) && <>
                        <div className={'alert'}>Ошибка: {errorMoreFilter}</div>
                        <div className={'alert'}>Ошибка: {errorMoreProducts}</div>
                        <div className={'nutipa'}/>
                    </>
                }
            </div>
            <CallToAction/>
        </div>
    );
};

export default SubCatalog;