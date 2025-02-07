import React, {useEffect, useRef, useState} from 'react';
import cl from './SearchPage.module.css';
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import search from "../../Assets/Pictures/search.svg";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

const SearchPage = () => {
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Поиск', path: '/search' },
    ];

    const [dataProducts, setDataProducts] = useState(null);
    const [loading, setLoading] = useState(true);  // Установить на true при старте
    const [errorProducts, setErrorProducts] = useState(null);  // Чтобы хранить ошибку
    const [searchParams] = useSearchParams();
    const param = searchParams.get('query');
    const [query, setQuery] = useState(param)
    const [queryInput, setQueryInput] = useState()
    const navigate = useNavigate()
    const productRef = useRef()
    const baseUrl = "http://alexaksa.beget.tech/";


    const handleChange = (e) => {
        setQueryInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            queryChange() // Вызов handleClick при нажатии Enter
        }
    };

    const queryChange = () => {
        setQuery(queryInput)
    }

    useEffect(() => {
        if (query === '') {
            setLoading(false);
            setErrorProducts("Поисковый запрос не указан");
            return;
        }
        const apiURL = `http://alexaksa.beget.tech/searchapi.html?query=${query}`;
        axios.get(apiURL)
            .then(response => {
                if (response.data.error) {
                    setErrorProducts(response.data.error);  // Если ошибка от API
                } else {
                    setDataProducts(response.data);  // Если данные пришли корректно
                    setErrorProducts(null)
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setErrorProducts("Произошла ошибка при запросе");
            });
    }, [query]);

    return (
        <div className={`page`}>
            <div className={cl.block}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h2>Результат по вашему поиску:</h2>
                <div className={cl.search}>
                    <input
                        type={"text"}
                        className={cl.searchField}
                        placeholder={'Поиск...'}
                        value={queryInput}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={queryChange}>
                        <img src={search} alt={'search'}/>
                    </button>
                </div>

                {loading && (
                    <>
                        <div className={'alert'}>Загрузка...</div>
                        <div className={cl.nutipa}/>
                    </>
                )}

                {!loading && errorProducts && (
                    <>
                        <div className={'alert'}>{errorProducts}</div>
                        <div className={cl.nutipa}/>
                    </>
                )}

                {!loading && !errorProducts && dataProducts && (
                    <div className={cl.productContainer}>
                        {dataProducts.map((product) =>
                            (
                                <div className={cl.product} key={product.id} ref={productRef} onClick={() => navigate(`/catalog/subcatalog/${product.alias}`)}>
                                    <img src={baseUrl + product.product_image} alt={product.pagetitle}/>
                                    <div className={cl.content}>
                                        <span>{product.parent_title}</span>
                                        <h5>{product.pagetitle}</h5>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
