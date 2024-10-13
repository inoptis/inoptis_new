import React from 'react';
import cl from './Partners.module.css'
import PartnersBlock from "../../Components/Blocks/PartnersBlock/PartnersBlock";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import partner1 from '../../Assets/Pictures/Partners/logo1.svg'
import partner2 from '../../Assets/Pictures/Partners/logo2.svg'
import partner3 from '../../Assets/Pictures/Partners/logo3.svg'
import partner4 from '../../Assets/Pictures/Partners/logo4.svg'
const Partners = () => {
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Партнеры', path: '/partners' },
    ];
    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Наши партнёры:</h1>
                <div className={cl.container}>
                    <div className={cl.item}>
                        <img src={partner1} alt="ТЭК-Системс"/>
                        <span>ТЭК-Системс</span>
                    </div>
                    <div className={cl.item}>
                        <img src={partner2} alt="ТЕСС-Инжиниринг"/>
                        <span>ТЕСС-Инжиниринг</span>
                    </div>
                    <div className={cl.item}>
                        <img src={partner3} alt="РБ Автоматика"/>
                        <span>РБ Автоматика</span>
                    </div>
                    <div className={cl.item}>
                        <img src={partner4} alt="ГК Ультра"/>
                        <span>ГК Ультра</span>
                    </div>
                </div>
            </div>
            <CallToAction/>
            <PartnersBlock/>
        </div>
    );
};

export default Partners;