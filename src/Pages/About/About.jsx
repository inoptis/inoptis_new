import React from 'react';
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import cl from  './About.module.css'
import AboutBlock from "../../Components/Blocks/AboutBlock/AboutBlock";
import DifficultiesBlock from "../../Components/Blocks/DifficultiesBlock/DifficultiesBlock";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import img1 from '../../Assets/Pictures/pictureHow/picture1.svg'
import img2 from '../../Assets/Pictures/pictureHow/picture2.svg'
import img3 from '../../Assets/Pictures/pictureHow/picture3.svg'
import img4 from '../../Assets/Pictures/pictureHow/picture4.svg'
import logo1 from '../../Assets/Pictures/pictureHow/logo_1.svg'
import logo2 from '../../Assets/Pictures/pictureHow/logo_2.svg'
import logo3 from '../../Assets/Pictures/pictureHow/logo_3.svg'
import logo4 from '../../Assets/Pictures/pictureHow/logo_4.svg'
import otrasl1 from '../../Assets/Pictures/pictureHow/otrasl1.svg'
import otrasl2 from '../../Assets/Pictures/pictureHow/otrasl2.svg'
import otrasl3 from '../../Assets/Pictures/pictureHow/otrasl3.svg'
import otrasl4 from '../../Assets/Pictures/pictureHow/otrasl4.svg'
import otrasl5 from '../../Assets/Pictures/pictureHow/otrasl5.svg'
import otrasl6 from '../../Assets/Pictures/pictureHow/otrasl6.svg'
import arrow from '../../Assets/Pictures/pictureHow/arrow.svg'
import otraslbg from '../../Assets/Pictures/pictureHow/pattern.svg'
const About = () => {
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'О компании', path: '/about' },
    ];

    const How = [
        {
            img:img1,
            text:'Выявление вашей потребности'
        },
        {
            img:img2,
            text:'Оформление условий поставки и транспортировка'
        },
        {
            img:img3,
            text:'Шеф-монтаж и инструктаж'
        },
        {
            img:img4,
            text:'Постпродажное обслуживание'
        },
    ]
    const Otrasl = [
        {
            img:otrasl1,
            text:'Нефтегазовая промышленность'
        },
        {
            img:otrasl2,
            text:'Фармацевтическая промышленность '
        },
        {
            img:otrasl3,
            text:'Химическая промышленность'
        },
        {
            img:otrasl4,
            text:'Пищевая промышленность'
        },
        {
            img:otrasl5,
            text:'Энергетическая промышленность '
        },
        {
            img:otrasl6,
            text:'Коммунальное хозяйство и водоснабжение'
        },
    ]

    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>О компании</h1>
                <p className={cl.quote}>Стабильно улучшаем работу предприятий, пока наши заказчики говорят: <br/>
                    <b>«Мы думали, что это невозможно измерить!»</b></p>
                <AboutBlock/>
            </div>
            <DifficultiesBlock/>
            <CallToAction/>
            <div className={cl.howToWork}>
                <h2>Как мы работаем?</h2>
                <div>
                    <div className={cl.arrows}>
                        <img src={arrow} alt={'arrow'}/>
                        <img src={arrow} alt={'arrow'}/>
                        <img src={arrow} alt={'arrow'}/>
                    </div>
                    <div className={cl.containerHow}>
                        {How.map((howitem, index) => (
                            <div className={cl.itemHow} key={index}>
                                <img src={howitem.img} alt={howitem.text}/>
                                <p>{howitem.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cl.otrasl}>
                <img className={cl.bg} src={otraslbg} alt={'bg'}/>
                <h2>Отрасли, с которыми мы работаем</h2>
                <div className={cl.containerOtrasl}>
                    {Otrasl.map((otraslitem, index) => (
                        <div className={cl.itemOtrasl} key={index}>
                            <img src={otraslitem.img} alt={otraslitem.text}/>
                            <h4>{otraslitem.text}</h4>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cl.parthners}>
                <div className={cl.parthnersLogos}>
                    <div><img src={logo1} alt="logo"/></div>
                    <div><img src={logo3} alt="logo"/></div>
                    <div><img src={logo2} alt="logo"/></div>
                    <div><img src={logo4} alt="logo"/></div>
                </div>
                <div className={cl.parthnersText}>
                    <h2>
                        Наши заказчики
                    </h2>
                    <p>
                        За последний год реализовано множество проектов
                        по поставкам комплексов автоматизированного учёта
                        и измерения расхода собственной сборки для предприятий водного хозяйства. Осуществляются поставки расходомерных узлов, уровнемеров и сигнализаторов уровня для предприятий химической отрасли.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;