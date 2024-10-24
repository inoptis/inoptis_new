import React, {useRef} from 'react';
import IButton from "../UI/IButton/IButton";
import cl from './Header.module.css'
import logo from '../../Assets/Pictures/logo_description.svg'
import phone from '../../Assets/Pictures/phone.svg'
import search from '../../Assets/Pictures/search.svg'
import useHover from "../../Hooks/useHover";
import arrow_light from '../../Assets/Pictures/arrow_icon_down.svg'
import arrow_black from '../../Assets/Pictures/ckeck_icon.png'
import Menu from "./Menu";
import {useNavigate} from "react-router-dom";
import {useWindowSize} from "../../Hooks/useWindowSize";
import HeaderMobile from "./HeaderMobile";
const Header = () => {
    const catalog = useRef();
    const isCatalog = useHover(catalog);
    const navigate = useNavigate();
    const [width] = useWindowSize();

    const goToMain = () => {
        navigate('/')
    }

    return (
        <>
            {width > 560 &&
            <header className={cl.header}>
                <div className={cl.top}>
                    <img className={cl.logo} src={logo} alt={'Inpotis'}/>
                    <div className={cl.contact}>
                        <img src={phone} alt={'phone'}/>
                        <div className={cl.phone}>
                            <span className={cl.number}>+7 (495) 646-05-06</span>
                            <span className={cl.schedule}>пн–пт с 9:00 до 18:00</span>
                        </div>
                        <IButton>
                            Заказать звонок
                        </IButton>
                    </div>
                </div>
                <div className={cl.bottom}>
                    <div className={cl.bottomContent}>
                        <div className={cl.pages}>
                            <button onClick={goToMain}>
                                Главная
                            </button>
                            <div className={cl.helper} ref={catalog}>
                                <button className={isCatalog ? cl.active : ''}>
                                    Каталог <img src={isCatalog ? arrow_black : arrow_light} alt={'arrow'}/>
                                </button>
                                {(isCatalog) &&
                                    <Menu/>
                                }
                            </div>
                            <button>
                                Контакты
                            </button>
                        </div>
                        <div className={cl.search}>
                            <input type={"text"} className={cl.searchField} placeholder={'Поиск...'}/>
                            <img src={search} alt={'search'}/>
                        </div>
                    </div>
                </div>
            </header>
            }
            {width <= 560 &&
                <HeaderMobile/>
            }
        </>
    );
};

export default Header;