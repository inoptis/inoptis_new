import React from 'react';
import cl from "./Header.module.css";

const Menu = () => {

    // const yrov = [
    //     {
    //         name:'Микроимпульсные уровнемеры'
    //     },
    //     {
    //         name:'Герконовые поплавковые уровнемеры'
    //     },
    //     {
    //         name:'Буйковые уровнемеры'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     }
    // ]
    // const sign = [
    //     {
    //         name:'Микроимпульсные sign'
    //     },
    //     {
    //         name:'Герконовые поплавковые sign'
    //     },
    //     {
    //         name:'Буйковые sign'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     }
    // ]
    // const rash = [
    //     {
    //         name:'Микроимпульсные rash'
    //     },
    //     {
    //         name:'Герконовые поплавковые rash'
    //     },
    //     {
    //         name:'Буйковые rash'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     }
    // ]
    // const teplo = [
    //     {
    //         name:'Микроимпульсные teplo'
    //     },
    //     {
    //         name:'Герконовые поплавковые teplo'
    //     },
    //     {
    //         name:'Буйковые teplo'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     },
    //     {
    //         name:'Магнитные указатели уровня жидкости'
    //     }
    // ]


    // const button1 = useRef();
    // const button2 = useRef();
    // const button3 = useRef();
    // const button4 = useRef();
    //
    // const isButton1 = useHover(button1)
    // const isButton2 = useHover(button2)
    // const isButton3 = useHover(button3)
    // const isButton4 = useHover(button4)
    //
    // const [buttons, setButtons] = useState(yrov)
    //
    // useEffect(() => {
    //     if (isButton1) setButtons(yrov)
    //     if (isButton2) setButtons(sign)
    //     if (isButton3) setButtons(rash)
    //     if (isButton4) setButtons(teplo)
    // }, [isButton1, isButton2, isButton3, isButton4]);

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