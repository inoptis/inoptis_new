import React, { useEffect, useState } from 'react';
import cl from './Modal.module.css'
import cross from "../../../Assets/Pictures/cross.svg";

const Modal = ({ children, close }) => {
    const [isActive, setIsActive] = useState(false);

    // Хук useEffect для активации и деактивации скролла на body
    useEffect(() => {
        setIsActive(true);
        document.body.classList.add('no-scroll'); // Добавляем класс для блокировки скролла

        // Функция очистки useEffect, которая будет вызвана при размонтировании компонента
        return () => {
            document.body.classList.remove('no-scroll'); // Удаляем класс при закрытии модального окна
        }
    }, []);

    const handleClose = () => {
        setIsActive(false); // Сначала делаем окно неактивным
        setTimeout(() => {
            close();
            document.body.classList.remove('no-scroll'); // Удаляем класс при закрытии модального окна с задержкой
        }, 300); // Затем вызываем функцию onClick с задержкой для анимации
    };

    const handleModalClick = (event) => {
        event.stopPropagation(); // Останавливаем всплытие события
    };

    return (
        <div className={`${cl.modalBackground} ${isActive ? cl.active : ''}`} onClick={handleClose}>
            <div className={`${cl.modalContainer} ${isActive ? cl.active : ''}`} onClick={handleModalClick}>
                <button onClick={handleClose} className={cl.cross}>
                    <img src={cross} alt={'cross'}/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
