import React, {useEffect, useState} from 'react';
import cl from './Partners.module.css'
import PartnersBlock from "../../Components/Blocks/PartnersBlock/PartnersBlock";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import axios from "axios";
const Partners = () => {
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Партнеры', path: '/partners' },
    ];

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        // URL API ресурса
        const apiURL = 'http://alexaksa.beget.tech/parthnersapi.html';
        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setData(response.data); // Устанавливаем данные из API в состояние
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                setLoading(false)
                setError(true);
            })
    }, []);

    const baseUrl = "http://alexaksa.beget.tech/";

    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Наши партнёры:</h1>
                {loading ? <>
                    <div className={'alert'}>Загрузка...</div>
                    <div className={'nutipa'}/>
                </> :
                    <div className={cl.container}>
                        {!error && data.map((partner) =>
                                <div className={cl.item}>
                                    <img src={baseUrl + partner.Image} alt={partner.pagetitle}/>
                                    <span>{partner.pagetitle}</span>
                                </div>
                            )}
                    </div>
                }
            </div>
            <CallToAction/>
            <PartnersBlock/>
        </div>
    );
};

export default Partners;