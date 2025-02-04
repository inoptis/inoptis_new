import React from 'react';
import cl from './MoreInfoBlocks.module.css'
import {useWindowSize} from "../../../Hooks/useWindowSize";
const MoreFeatures = ({content}) => {

    const [width] = useWindowSize()

    const result = content.reduce((acc, pair, index, arr) => {
        if (index % 2 === 0) {
            // Каждая пара "заголовок - описание"
            const descriptions = arr[index + 1]; // Следующий элемент — описание
            pair.forEach((title, i) => {
                acc.push([title, descriptions[i]]);
            });
        }
        return acc;
    }, []);

    if (content.length % 2 !== 0) {
        content.push(['', '']); // Добавляем пустой элемент
    }


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
                    {content.map((detail, index) => (
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