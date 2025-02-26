import React from 'react';
import cl from './Footer.module.css'
import logo from "../../Assets/Pictures/bg-logo.svg";
import footerLogo from '../../Assets/Pictures/footer-logo.svg'
import mobileLogo from '../../Assets/Pictures/mobile_logo.svg'
import {Link} from "react-router-dom";
import {useWindowSize} from "../../Hooks/useWindowSize";
const Footer = () => {
    const [width] = useWindowSize()
    return (
        <footer className={cl.block}>
            <div className={cl.containerBg}>
                <img className={cl.bg} src={logo} alt={'logo'}/>
            </div>
            <div className={cl.content}>
                <div className={cl.col1}>
                    <div className={cl.col11}>
                        <Link to={'/'}>Главная</Link>
                        <Link to={'/catalog'}>Каталог</Link>
                        <span>Услуги</span>
                    </div>
                    <div className={cl.col11}>
                        <Link to={'/about'}>О компании</Link>
                        <Link to={'/partners'}>Партнёры</Link>
                        <Link to={'/contacts'}>Контакты</Link>
                    </div>
                </div>
                <div className={cl.col2}>
                    <img src={width > 560 ? footerLogo : mobileLogo} alt={'company'}/>
                    <span>Политика конфиденциальности</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;