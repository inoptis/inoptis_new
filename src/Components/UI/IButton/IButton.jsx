import React from 'react';
import cl from './IButton.module.css'
const IButton = ({children, className, color = 'full', onClick, type=''}) => {
    return (
        <button type={type} onClick={onClick} className={`${className} ${cl.button} ${color ==='full' ? cl.full : cl.border}`}>
            {children}
        </button>
    );
};

export default IButton;