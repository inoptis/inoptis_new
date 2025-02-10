import React, { useState, useRef } from 'react';
import cl from './ProductPage.module.css';
import IButton from "../../Components/UI/IButton/IButton";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import doubleArrow from '../../Assets/Pictures/double-arrow.svg';
import arrowdark from "../../Assets/Pictures/arrow-filter-dark.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../../Components/UI/Modal/Modal";
import Form from "../../Components/UI/Form/Form";

const ProductPageTest = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [isOpen, setIsOpen] = useState([]);
    const filtercontainer = useRef();
    const [usedImg, ] = useState('placeholder.jpg');
    const [modal, setModal] = useState(false);

    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Подкаталог', path: '/catalog/subcatalog' },
    ];

    const staticDataFilter = [
        {
            pagetitle: "Категория 1",
            children: [
                { id: 1, pagetitle: "Подкатегория 1-1" },
                { id: 2, pagetitle: "Подкатегория 1-2" }
            ]
        },
        {
            pagetitle: "Категория 2",
            children: [
                { id: 3, pagetitle: "Подкатегория 2-1" },
                { id: 4, pagetitle: "Подкатегория 2-2" }
            ]
        }
    ];

    const staticProductData = {
        pagetitle: "Название продукта",
        product_content: "Описание продукта.",
        product_image: { fieldValue: [{ image: "placeholder.jpg" }] },
        product_features: [
            ["Характеристика 1", "Значение 1"],
            ["Характеристика 2", "Значение 2"]
        ]
    };

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);
    const toggleSection = index => {
        setIsOpen(prevState => prevState.map((state, idx) => idx === index ? !state : state));
    };
    const closeFilter = () => setFilterOpen(!filterOpen);

    return (
        <>
            {modal && <Modal close={closeModal}><Form/></Modal>}
            <div className={'page'}>
                <div className={cl.mainBlock}>
                    <div className={cl.breadcrumbs}>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    <div className={`${cl.helper} ${filterOpen ? cl.open : ''}`}>
                        <div className={cl.buttonFilter} onClick={closeFilter}>
                            <img className={filterOpen ? '' : cl.rotate} src={doubleArrow} alt="arrow" />
                            <span>Категории</span>
                        </div>
                        <div ref={filtercontainer} className={cl.filterMainContainer}>
                            {staticDataFilter.map((category, index) => (
                                <div className={cl.filterItem} key={index}>
                                    <div className={`${cl.mainItem}`} onClick={() => toggleSection(index)}>
                                        <span>{category.pagetitle}</span>
                                        <img className={isOpen[index] ? '' : cl.rotate} src={arrowdark} alt='arrow' />
                                    </div>
                                    <div className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                        {category.children.map((item, idx) => (
                                            <div className={`${cl.item}`} key={idx}>{item.pagetitle}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cl.productInfo}>
                        <div className={cl.title}>
                            <h1>{staticProductData.pagetitle}</h1>
                            <IButton onClick={openModal} color={'border'} className={cl.button}>Узнать стоимость</IButton>
                        </div>
                        <div className={cl.productContainer}>
                            <div className={cl.images}>
                                <img className={cl.mainImage} src={usedImg} alt="product" />
                            </div>
                            <div className={cl.info}>
                                <p>{staticProductData.product_content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPageTest;
