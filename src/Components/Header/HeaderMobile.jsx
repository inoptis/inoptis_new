import React, {useEffect, useState} from 'react';
import cl from "./Header.module.css";
import IButton from "../UI/IButton/IButton";
import humburger from "../../Assets/Pictures/Humburger.svg";
import logomobile from "../../Assets/Pictures/logomobile.svg";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "../UI/Modal/Modal";
import Form from "../UI/Form/Form";

const HeaderMobile = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [catalogOpen, setCatalogOpen] = useState(false);
    const [dataFilter, setDataFilter] = useState(null)
    const [loading, setLoading] = useState()
    const [errorFilter, setErrorFilter] = useState()
    const [modal, setModal] = useState(false)

    const closeModal = () => {
        setModal(false)
    }

    const openModal = () => {
        setModal(true)
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const toggleCatalog = () => {
        setCatalogOpen(!catalogOpen);
    };

    const clickButton = (id) => {
        setCatalogOpen(false)
        setMenuOpen(false)
        navigate(`/catalog/subcatalog?id=${id}`)
    }

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
    }, []);

    return (
        <>
            {modal &&
                <Modal close={closeModal}>
                    <Form/>
                </Modal>
            }
        <header className={cl.header}>
            <div className={cl.top}>
                <IButton onClick={openModal} className={cl.mobile}>
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
                {!loading && !errorFilter && dataFilter !== null &&
                    <div className={`${cl.subMenu} ${catalogOpen ? cl.open : ''}`}>
                        {dataFilter.map((category, index) => (
                            <div onClick={() => clickButton(category.children[0].id)} key={index} className={cl.subMenuItem}>
                                {category.pagetitle}
                            </div>
                        ))}
                    </div>
                }
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