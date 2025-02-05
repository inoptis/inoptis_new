import React, {useState} from 'react';
import cl from './ProductCard.module.css'
import IButton from "../UI/IButton/IButton";
import {useNavigate} from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import Form from "../UI/Form/Form";
const ProductCard = ({product, category}) => {
    const navigate = useNavigate()
    const baseUrl = "http://alexaksa.beget.tech/";
    const [modal, setModal] = useState(false)

    const closeModal = () => {
        setModal(false)
    }

    const openModal = () => {
        setModal(true)
    }

    return (
        <>
            {modal &&
                <Modal close={closeModal}>
                    <Form/>
                </Modal>
            }
            <div className={cl.card} onClick={() => navigate(`/catalog/subcatalog/${product.alias}`)}>
                <img className={cl.img} alt={product.pagetitle} src={baseUrl + product.product_image}/>
                <div className={cl.content}>
                    <div className={cl.text}>
                        <span>{category}</span>
                        <h5>{product.pagetitle}</h5>
                    </div>
                    <IButton onClick={openModal} color={'border'} className={cl.button}>Узнать стоимость</IButton>
                </div>
            </div>
        </>

    );
};

export default ProductCard;