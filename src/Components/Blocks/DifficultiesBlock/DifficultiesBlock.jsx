import React from 'react';
import cl from  './Difficulties.module.css'
import icon1 from '../../../Assets/Pictures/DifficultesItems/icon1.svg'
import icon2 from '../../../Assets/Pictures/DifficultesItems/icon2.svg'
import icon3 from '../../../Assets/Pictures/DifficultesItems/icon3.svg'
import icon4 from '../../../Assets/Pictures/DifficultesItems/icon4.svg'
import icon5 from '../../../Assets/Pictures/DifficultesItems/icon5.svg'
import bg1 from '../../../Assets/Pictures/block_1.svg'
import bg2 from '../../../Assets/Pictures/block_2.svg'
import {useWindowSize} from "../../../Hooks/useWindowSize";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const DifficultiesBlock = () => {

    const [width, ] = useWindowSize()

    const difficulties = [
        {
            title:'Комплексный подход',
            img: icon1,
            description:'«Что у вас не работает?» — \n' +
                'с этой фразы мы начинаем работы \n' +
                'по аналитике и подбору подходящего решения.'
        },
        {
            title:'Наши заказчики — \n' +
                'наши партнёры',
            img: icon2,
            description:'Всегда ведём с заказчиками диалог, учитывая их интересы и не оставляя их наедине с проблемами.'
        },
        {
            title:'Специализированное исполнение',
            img: icon3,
            description:'Производим и поставляем уникальные решения, которые точно соответствуют запросам заказчиков. '
        },
        {
            title:'Гибкость и эффективность',
            img: icon4,
            description:'Мы оптитмизировали структуру работ — быстро отвечаем и предоставляем решение в течение 2-х рабочих дней.'
        },
        {
            title:'Типовые позиции всегда в наличии',
            img: icon5,
            description:'«Знаем чувствительные позиции для производства, и они всегда доступны для заказа со склада.'
        },
    ]


    const settings = {
        dots: true, // Показывать точки-индикаторы слайдов
        infinite: true, // Бесконечное зацикливание слайдов
        speed: 500, // Скорость смены слайдов
        slidesToShow: 1, // Показывать по одному слайду
        slidesToScroll: 1, // Прокручивать по одному слайду
        arrows: false, // Отключить стрелки навигации
        swipeToSlide: true, // Позволить свайпинг для навигации
        adaptiveHeight: true // Автоматически подстраивать высоту слайдера под элемент слайда
    };

    return (
        <div className={cl.block}>
            <h2>Почему мы не боимся трудностей?</h2>
            {width > 560 &&
                <div className={cl.container}>
                    {difficulties.map((difficult, index) => (
                        <div className={index % 2 === 0 ? cl.white : cl.dark} key={index}>
                            <img src={index % 2 === 0 ? bg2 : bg1} className={cl.bg} alt="background"/>
                            <div className={cl.row1}>
                                <img src={difficult.img} alt={difficult.title}/>
                                <h4>{difficult.title}</h4>
                            </div>
                            <p className={cl.row2}>{difficult.description}</p>
                        </div>
                    ))}
                </div>
            }
            {width <= 560 &&
                <Slider {...settings}>
                    {difficulties.map((difficult, index) => (
                        <div className={cl.item}>
                            <div className={index % 2 === 0 ? cl.white : cl.dark} key={index}>
                                <img src={index % 2 === 0 ? bg2 : bg1} className={cl.bg} alt="background"/>
                                <div className={cl.row1}>
                                    <img src={difficult.img} alt={difficult.title}/>
                                    <h4>{difficult.title}</h4>
                                </div>
                                <p className={cl.row2}>{difficult.description}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            }
        </div>
    );
};

export default DifficultiesBlock;