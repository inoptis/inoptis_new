import React, {useEffect, useState} from 'react';
import cl from './Partners.module.css'
import PartnersBlock from "../../Components/Blocks/PartnersBlock/PartnersBlock";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import { CSSTransition } from "react-transition-group";
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
        const apiURL = 'https://inoptis.ru/parthnersapi.html';
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

    const baseUrl = "https://inoptis.ru/";

    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Наши партнёры:</h1>
                <CSSTransition
                    in={loading}
                    timeout={100} // Длительность анимации
                    classNames="fadefast"
                    unmountOnExit
                >
                    <Loader />
                </CSSTransition>
                {loading ? <>
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