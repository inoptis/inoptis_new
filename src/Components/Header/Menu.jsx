import React from 'react';
import cl from "./Header.module.css";
import {testCategories} from "../../utils/TestCategories";
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate()
    const clickButton = () => {
        navigate('/catalog/subcatalog')
    }
    return (
        <div className={cl.window1}>
            <div className={cl.buttons}>
                {testCategories.map((category, index) =>
                    <button onClick={clickButton} key={index}>{category.name}</button>
                )}
            </div>
        </div>

    );
};

export default Menu;