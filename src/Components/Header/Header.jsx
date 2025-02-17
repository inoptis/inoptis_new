import React, {useRef, useState} from 'react';
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
import Modal from "../UI/Modal/Modal";
import Form from "../UI/Form/Form";
const Header = () => {
    const catalog = useRef();
    const isCatalog = useHover(catalog);
    const navigate = useNavigate();
    const [width] = useWindowSize();
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState()

    const closeModal = () => {
        setModal(false)
    }

    const queryChange = (e) => {
        setQuery(e.target.value);
    };

    const queryKey = (e) => {
        if (e.key === 'Enter') {
            searchButton() // Вызов handleClick при нажатии Enter
        }
    };

    const searchButton = () => {
        navigate(`/search?query=${query}`)
    }

    const openModal = () => {
        setModal(true)
    }

    const goToMain = () => {
        navigate('/')
    }
    const goToContact = () => {
        navigate('/contacts')
    }

    return (
        <>
            {modal &&
                <Modal close={closeModal}>
                    <Form/>
                </Modal>
            }
            {width > 560 &&
            <header className={cl.header}>
                <div className={cl.top}>
                    <div onClick={goToMain} style={{cursor:"pointer"}}>
                        <img className={cl.logo} onClick={goToMain} src={logo} alt={'Inpotis'}/>
                    </div>
                    <div className={cl.contact}>
                    <img src={phone} alt={'phone'}/>
                        <div className={cl.phone}>
                            <a href={'tel:+74956460506'} className={cl.number} >+7 (495) 646-05-06</a>
                            <span className={cl.schedule}>пн–пт с 9:00 до 18:00</span>
                        </div>
                        <IButton onClick={openModal} className={cl.call}>
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
                                <button onClick={() => navigate('/catalog')} className={isCatalog ? cl.active : ''}>
                                    Каталог <img src={isCatalog ? arrow_black : arrow_light} alt={'arrow'}/>
                                </button>
                                {(isCatalog) &&
                                    <Menu/>
                                }
                            </div>
                            <button onClick={goToContact}>
                                Контакты
                            </button>
                        </div>
                        <div className={cl.search}>
                            <input type={"text"} value={query} onChange={queryChange} onKeyDown={queryKey} className={cl.searchField} placeholder={'Поиск...'}/>
                            <button onClick={searchButton}>
                                <img src={search} alt={'search'}/>
                            </button>
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