import React, {useState} from 'react';
import cl from "./Header.module.css";
import IButton from "../UI/IButton/IButton";
import humburger from "../../Assets/Pictures/Humburger.svg";
import logomobile from "../../Assets/Pictures/logomobile.svg";
import {Link} from "react-router-dom";

const HeaderMobile = () => {
    // const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [catalogOpen, setCatalogOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleCatalog = () => {
        setCatalogOpen(!catalogOpen);
    };

    return (
        <>
        <header className={cl.header}>
            <div className={cl.top}>
                <IButton className={cl.mobile}>
                    Заказать звонок
                </IButton>
            </div>
            <div className={cl.bottom}>
                <div className={cl.mobilehumburger}>
                    <button onClick={toggleMenu}>
                        <img src={humburger} alt="menu"/>
                    </button>
                </div>
                <img src={logomobile} alt={'Inpotis'}/>
            </div>
        </header>
        <div className={`${cl.openMenu} ${menuOpen ? cl.open : ''}`}>
            <div className={cl.dropdownMenu}>
                <div className={cl.menuItem}>
                    <Link onClick={toggleMenu} className={cl.link} to={'/'}>Главная</Link>
                </div>
                <div onClick={toggleCatalog} className={`${cl.menuItem} ${catalogOpen ? cl.open : ''}`}>
                    <span>Каталог <img src="" alt=""/></span>
                </div>
                <div className={`${cl.subMenu} ${catalogOpen ? cl.open : ''}`}>
                    <div className={cl.subMenuItem}>
                        Расход
                    </div>
                    <div className={cl.subMenuItem}>
                        Уровень
                    </div>
                    <div className={cl.subMenuItem}>
                        Давление
                    </div>
                    <div className={cl.subMenuItem}>
                        Температура
                    </div>
                    <div className={cl.subMenuItem}>
                        Индикаторы процессов и полевые устройства
                    </div>
                    <div className={cl.subMenuItem}>
                        Инструментальная арматура
                    </div>
                    <div className={cl.subMenuItem}>
                        Шкафы автоматизации
                    </div>
                    <div className={cl.subMenuItem}>
                        Вспомогательное оборудование
                    </div>
                    <div className={cl.subMenuItem}>
                        Поверочные установки
                    </div>
                </div>
                <div className={cl.menuItem}>
                    <Link onClick={toggleMenu} className={cl.link} to={'/contacts'}>Контакты</Link>
                </div>
            </div>
        </div>
        </>
    )
        ;
};

export default HeaderMobile;