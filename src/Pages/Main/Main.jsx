import React from 'react';
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
import {useWindowSize} from "../../Hooks/useWindowSize";
const Main = () => {
    const products = [
        'Давление',
        'Температура',
        'Шкафы автоматизации',
        'Уровень',
        'Индикаторы процессов и полевые устройства',
        'Вспомогательное оборудование',
        'Расход',
        'Инструментальная арматура',
        'Поверочные установки',
    ]
    return (
        <div className={'page'}>
            <div className={cl.banner}></div>
            <div className={cl.products}>
                <h2>Наша продукция:</h2>
                <div className={cl.productsContainer}>
                    {products.map((product, index)=>(
                        <button key={index}>
                            <img className={cl.buttonLeft} src={index % 2 === 0 ? chet : nechet} alt={'bg'}/>
                            {product}
                        </button>
                    ))}

                </div>
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