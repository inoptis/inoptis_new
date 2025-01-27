import React from 'react';
import cl from './ProductCard.module.css'
import IButton from "../UI/IButton/IButton";
import {useNavigate} from "react-router-dom";
const ProductCard = ({product}) => {
    const navigate = useNavigate()
    return (
        <div className={cl.card} onClick={() => navigate('/catalog/subcatalog/product')}>
            <img className={cl.img} alt={product.name} src={product.img}/>
            <div className={cl.content}>
                <div className={cl.text}>
                    <span>{product.category}</span>
                    <h5>{product.name}</h5>
                </div>
                <IButton color={'border'} className={cl.button}>Узнать стоимость</IButton>
            </div>
        </div>
    );
};

export default ProductCard;