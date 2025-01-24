import React from 'react';
import cl from './ProductCard.module.css'
import IButton from "../UI/IButton/IButton";
const ProductCard = ({product}) => {
    return (
        <div className={cl.card}>
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