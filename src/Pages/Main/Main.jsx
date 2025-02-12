import React, {useEffect, useState} from 'react';
import cl from './Main.module.css'
import AboutBlock from "../../Components/Blocks/AboutBlock/AboutBlock";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import DifficultiesBlock from "../../Components/Blocks/DifficultiesBlock/DifficultiesBlock";
import chet from '../../Assets/Pictures/left-button-img.svg'
import nechet from '../../Assets/Pictures/left-button-img-nechet.svg'
import bgquote1 from '../../Assets/Pictures/pattern-quote1.svg'
import bgquote2 from '../../Assets/Pictures/pattern-quote2.svg'
import ContactBlock from "../../Components/Blocks/ContactBlock/ContactBlock";
import PartnersBlock from "../../Components/Blocks/PartnersBlock/PartnersBlock";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
const Main = () => {

    const [dataFilter, setDataFilter] = useState(null)
    const [loading, setLoading] = useState()
    const [errorFilter, setErrorFilter] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        // URL API ресурса
        const apiURL = 'http://alexaksa.beget.tech/api.html';
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
    }, []); // Пустой массив зависимостей - useEffect выполнится один раз при монтировании компонента

    return (
        <div className={'page'}>
            <div className={cl.banner}></div>
            <div className={cl.products}>
                <h2>Н :</h2>
                {loading ? <Loader/> : <>
                    {!errorFilter && dataFilter !== null &&
                        <div className={cl.productsContainer}>
                            {dataFilter.map((product, index) => (
                                <button
                                    onClick={() => navigate(`/catalog/subcatalog?id=${product.children[0].id}`)}
                                    key={index}>
                                    <img className={cl.buttonLeft} src={index % 2 === 0 ? chet : nechet} alt={'bg'}/>
                                    {product.pagetitle}
                                </button>
                            ))}
                        </div>
                    }
                </>
                }
            </div>
            <div className={cl.quote}>
                <img className={cl.bgquote1} src={bgquote1} alt={'bg'}/>
                <img className={cl.bgquote2} src={bgquote2} alt={'bg'}/>
                <span>
                    Стабильно улучшаем работу предприятий, пока наши заказчики говорят:
                    <b>«Мы думали, что это невозможно измерить!»</b>
                </span>
            </div>
            <AboutBlock/>
            <CallToAction/>
            <DifficultiesBlock/>
            <ContactBlock/>
            <PartnersBlock/>
        </div>
    );
};

export default Main;