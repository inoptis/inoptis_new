import React from 'react';
import cl from './Footer.module.css'
import logo from "../../Assets/Pictures/bg-logo.svg";
import footerLogo from '../../Assets/Pictures/footer-logo.svg'
import {Link} from "react-router-dom";
const Footer = () => {
    return (
        <footer className={cl.block}>
            <img className={cl.bg} src={logo} alt={'logo'}/>
            <div className={cl.content}>
                <div className={cl.col1}>
                    <div className={cl.col11}>
                        <Link to={'/'}>Главная</Link>
                        <a href={'#'}>Каталог</a>
                        <a href={'#'}>Услуги</a>
                    </div>
                    <div className={cl.col11}>
                        <Link to={'/about'}>О компании</Link>
                        <Link to={'/partners'}>Партнёры</Link>
                        <a href={'#'}>Контакты</a>
                    </div>
                </div>
                <div className={cl.col2}>
                    <img src={footerLogo} alt={'company'}/>
                    <a href={'#'}>Политика конфиденциальности</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;