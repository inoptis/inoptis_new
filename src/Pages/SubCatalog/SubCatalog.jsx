import React, { useEffect, useState, useRef } from 'react';
import cl from './SubCatalog.module.css';
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ProductCard from "../../Components/ProductCard/ProductCard";
import arrow from '../../Assets/Pictures/arrow-filter.svg';
import arrowdark from '../../Assets/Pictures/arrow-filter-dark.svg';
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

const SubCatalog = () => {
    const [searchParams] = useSearchParams();
    const param = searchParams.get('id');
    const [active, setActive] = useState(null);
    const [isOpen, setIsOpen] = useState([]);
    const filterRefs = useRef([]);

    const toggleSection = (index) => {
        setIsOpen(prevState => prevState.map((state, idx) => idx === index ? !state : state));
    };

    const clickItem = (category, item) => {
        setActive([category, item]);
    };

    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Ультразвуковые расходомеры жидкости (врезные)', path: '/catalog/subcatalog' }
    ];

    const [errorFilter, setErrorFilter] = useState(false);
    const [errorProducts, setErrorProducts] = useState(false);
    const [errorMoreFilter, setErrorMoreFilter] = useState(false);
    const [errorMoreProducts, setErrorMoreProducts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState([]);
    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        axios.get('/api.html')
            .then(response => {
                setDataFilter(response.data);
                setLoading(false);

                const initialCategory = param
                    ? response.data.find(category => category.children.some(subcategory => subcategory.id === param))
                    : response.data[0];

                const initialSubcategory = param
                    ? initialCategory.children.find(subcategory => subcategory.id === param)
                    : initialCategory.children[0];

                setActive([initialCategory, initialSubcategory]);
                setIsOpen(response.data.map(cat => cat.id === initialCategory.id));
            })
            .catch(error => {
                console.log(error);
                setErrorMoreFilter(error.message);
                setLoading(false);
                setErrorFilter(true);
            });
    }, [param]);

    useEffect(() => {
        if (active !== null) {
            axios.get(`/categoryproductsapi.html?category_id=${active[1].id}`)
                .then(response => {
                    setDataProducts(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setErrorMoreProducts(error.message);
                    setLoading(false);
                    setErrorProducts(true);
                });
        }
    }, [active]);

    useEffect(() => {
        isOpen.forEach((state, index) => {
            if (filterRefs.current[index]) {
                filterRefs.current[index].style.maxHeight = state ? `${filterRefs.current[index].scrollHeight}px` : '0px';
            }
        });
    }, [isOpen]);

    return (
        <div className='page'>
            <div className={cl.mainBlock}>
                {loading && <Loader />}
                {!loading && !errorFilter && active !== null && (
                    <>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <h1>{active[1].pagetitle}</h1>
                        <p>{active[1].content}</p>
                        <div className={cl.catalogContainer}>
                            <div className={cl.filter}>
                                {dataFilter.map((category, index) => (
                                    <div className={cl.filterItem} key={index}>
                                        <div className={`${cl.mainItem} ${active[0].id === category.id ? cl.active : ''}`} onClick={() => toggleSection(index)}>
                                            <span>{category.pagetitle}</span>
                                            <img className={isOpen[index] ? '' : cl.rotate} src={active[0].id === category.id ? arrow : arrowdark} alt='arrow' />
                                        </div>
                                        <div ref={(el) => (filterRefs.current[index] = el)} className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                            {category.children.map((item, idx) => (
                                                <div className={`${cl.item} ${active[1].id === item.id ? cl.active : ''}`} key={idx} onClick={() => clickItem(category, item)}>
                                                    {item.pagetitle}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {!loading && !errorProducts && (
                                <div className={cl.productContainer}>
                                    {dataProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} category={active[1].pagetitle} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
                {(errorFilter || errorProducts) && (
                    <>
                        <div className={'alert'}>Ошибка: {errorMoreFilter}</div>
                        <div className={'alert'}>Ошибка: {errorMoreProducts}</div>
                        <div className={'nutipa'} />
                    </>
                )}
            </div>
            <CallToAction />
        </div>
    );
};

export default SubCatalog;
