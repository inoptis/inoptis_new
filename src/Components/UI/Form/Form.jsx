import React, {useState} from 'react';
import FormRequest from "./FormRequest";
import cl from './Form.module.css'
import FormCall from "./FormCall";

const Form = () => {
    const [isActive, setIsActive] = useState(true); // To manage active button styling
    const [active, setActive] = useState('Заявка');

    const handleRequest = () => {
        setActive("Заявка");
        setIsActive(true);
    };

    const handleCall = () => {
        setActive("Звонок");
        setIsActive(false);
    };

    return (
        <div className={cl.form}>
            <div className={cl.buttons}>
                <button onClick={handleRequest} className={`${cl.button} ${isActive ? cl.active : ''}`}>Оформление заявки</button>
                <button onClick={handleCall} className={`${cl.button} ${isActive ?  '' : cl.active}`}>Обратный звонок</button>
            </div>
            {
                active === "Заявка" && (
                    <FormRequest/>
                )
            }
            {
                active === "Звонок" && (
                    <FormCall/>
                )
            }
        </div>
    );
};

export default Form;