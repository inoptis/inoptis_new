import React, {useEffect, useState} from 'react';
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ContactBlock from "../../Components/Blocks/ContactBlock/ContactBlock";
import cl from './Catalog.module.css'
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {testCategories} from "../../utils/TestCategories";
import {useWindowSize} from "../../Hooks/useWindowSize";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Catalog = () => {
    const [width] = useWindowSize()
    const navigate = useNavigate()
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
        // URL API ресурса
        const apiURL = 'http://alexaksa.beget.tech/api.html';
        // Запрос через Axios 
        axios.get(apiURL)
            .then(response => {
                setData(response.data); // Устанавливаем данные из API в состояние
            })
    }, []); // Пустой массив зависимостей - useEffect выполнится один раз при монтировании компонента

    useEffect(() => {
        console.log(data)
    }, [data, setData]);

    const categories = testCategories
    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Каталог</h1>
                {width > 560 &&
                    <div className={cl.container}>
                        {categories.map((category, index) => (
                            <div className={cl.item} key={index}>
                                <h4 onClick={()=>navigate('/catalog/subcatalog')}>{category.name}</h4>
                                <div className={cl.containerChildren}>
                                    {category.children.map((name, index) => (
                                        <span onClick={()=>navigate('/catalog/subcatalog')} className={cl.children} key={index}>{name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {width <= 560 &&
                    <div className={cl.container}>
                        {categories.map((category, index) => (
                            <div  className={cl.item} key={index}>
                                <h4 onClick={()=>navigate('/catalog/subcatalog')}>{category.name}</h4>
                                <div className={cl.containerChildren}>
                                    {category.children.map((name, index) => (
                                        <span onClick={()=>navigate('/catalog/subcatalog')} className={cl.children} key={index}>{name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <CallToAction/>
            <ContactBlock/>
        </div>
    );
};

export default Catalog;