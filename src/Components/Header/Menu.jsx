import React from 'react';
import cl from "./Header.module.css";
import {testCategories} from "../../utils/TestCategories";

const Menu = () => {

    return (
        <div className={cl.window1}>
            <div className={cl.buttons}>
                {testCategories.map((category, index) =>
                    <button key={index}>{category.name}</button>
                )}
            </div>
        </div>

    );
};

export default Menu;