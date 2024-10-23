import React from 'react';
import cl from "./Header.module.css";

const Menu = () => {

    return (
        <div className={cl.window1}>
            <div className={cl.buttons}>
                <button>Расход</button>
                <button>Уровень</button>
                <button>Давление</button>
                <button>Температура</button>
                <button>Индикаторы процессов и полевые устройства</button>
                <button>Инструментальная арматура</button>
                <button>Шкафы автоматизации</button>
                <button>Вспомогательное оборудование</button>
                <button>Поверочные установки</button>
            </div>
        </div>

    );
};

export default Menu;