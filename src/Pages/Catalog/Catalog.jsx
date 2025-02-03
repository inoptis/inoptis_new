import React, {useEffect, useState} from 'react';
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ContactBlock from "../../Components/Blocks/ContactBlock/ContactBlock";
import cl from './Catalog.module.css'
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {useWindowSize} from "../../Hooks/useWindowSize";
import {useNavigate} from "react-router-dom";
import axios from "axios";
const Catalog = () => {
    const [width] = useWindowSize()
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [errorMore, setErrorMore] = useState(false)
    const [loading, setLoading] = useState(true)
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
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setErrorMore(error.message); // или error.toString()
                setLoading(false)
                setError(true);
            })

        console.log('test')
    }, []); // Пустой массив зависимостей - useEffect выполнится один раз при монтировании компонента

    useEffect(() => {
        console.log(data)
    }, [data, setData]);

    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Каталог</h1>
                {loading ? <div className={cl.alert}>Загрузка...</div> : <>
                    {width > 560 &&
                        <div className={cl.container}>
                            {data.map((category, index) => (
                                <div className={cl.item} key={index}>
                                    <h4 onClick={()=>navigate('/catalog/subcatalog')}>{category.pagetitle}</h4>
                                    <div className={cl.containerChildren}>
                                        {category.children.map((name, index) => (
                                            <span onClick={()=>navigate('/catalog/subcatalog')} className={cl.children} key={index}>{name.pagetitle}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    {width <= 560 &&
                        <div className={cl.container}>
                            {data.map((category, index) => (
                                <div  className={cl.item} key={index}>
                                    <h4 onClick={()=>navigate('/catalog/subcatalog')}>{category.pagetitle}</h4>
                                    <div className={cl.containerChildren}>
                                        {category.children.map((name, index) => (
                                            <span onClick={()=>navigate('/catalog/subcatalog')} className={cl.children} key={index}>{name.pagetitle}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </>}
                {error && <div className={cl.alert}>Ошибка: {errorMore}</div>}

            </div>
            <CallToAction/>
            <ContactBlock/>
        </div>
    );
};

export default Catalog;