import React from 'react';
import cl from './MoreInfoBlocks.module.css'
import {useWindowSize} from "../../../Hooks/useWindowSize";
const MoreFeatures = () => {

    const [width] = useWindowSize()

    const features = [
        ['Диапазон значений Ду трубопровода', 'DN4...DN2000'],
        ['Направление потока', 'прямое, реверсивное'],
        ['t° контролируемой жидкости', 'от -30 до 150 °C'],
        ['Давление в трубопроводе', 'от 1 до 4 МПа (до 32 МПа)'],
        ['t° окружающей среды', 'от -40 до 60 °C (до -70 °C)'],
        ['Степень защиты', 'IP65-IP68'],
        ['Тип взрывозащиты', '1Exd[ib]IICT6...T3 Gb X'],
        ['Питание', '24 В (постоянный ток), 220 В (переменный ток), автономное питание (от батареи)'],
        ['Выходные сигналы', 'импульсный, токовый 4-20 мА, RS-485 Modbus (Profibus DP, Profibus PA, HART)'],
        ['','']
    ];

    const result = features.reduce((acc, pair, index, arr) => {
        if (index % 2 === 0) {
            // Каждая пара "заголовок - описание"
            const descriptions = arr[index + 1]; // Следующий элемент — описание
            pair.forEach((title, i) => {
                acc.push([title, descriptions[i]]);
            });
        }
        return acc;
    }, []);


    return (
        <>
            {
                width > 560 &&
                <div className={cl.features}>
                    {result.map((feature, index) => (
                        <div key={index} className={cl.featureItem}>
                            <span>{feature[0]}</span>
                            <span>{feature[1]}</span>
                        </div>
                    ))}
                </div>
            }
            {width <= 560 &&
            <div className={cl.features}>
                {features.map((detail, index) => (
                    detail[0] !== '' && detail[1] !== '' &&
                    <div key={index} className={cl.detailsItemMobile}>
                        <span>{detail[0]}</span>
                        <span>{detail[1]}</span>
                    </div>
                ))}
            </div>
            }
        </>
    );
};

export default MoreFeatures;