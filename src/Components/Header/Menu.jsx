import React, {useEffect, useState} from 'react';
import cl from "./Header.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Menu = () => {

    const [dataFilter, setDataFilter] = useState(null)
    const [loading, setLoading] = useState()
    const [errorFilter, setErrorFilter] = useState()
    const navigate = useNavigate()
    const clickButton = (id) => {
        navigate(`/catalog/subcatalog?id=${id}`)
    }

    useEffect(() => {
        // URL API ресурса
        const apiURL = 'https://inoptis.ru/api.html';
        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setDataFilter(response.data); // Устанавливаем данные из API в состояние
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
                setErrorFilter(true);
            })
    }, []);


    return (
        <div className={cl.window1}>
            {!loading && !errorFilter && dataFilter !== null &&
                <div className={cl.buttons}>
                {dataFilter.map((category, index) =>
                    <button onClick={() => clickButton(category.children[0].id)} key={index}>{category.pagetitle}</button>
                )}
            </div>
            }

        </div>

    );
};

export default Menu;