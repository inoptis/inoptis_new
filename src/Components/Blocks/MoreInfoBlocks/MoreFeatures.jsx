import React from 'react';
import cl from './MoreInfoBlocks.module.css';
import { useWindowSize } from "../../../Hooks/useWindowSize";

const MoreFeatures = ({ content }) => {
    const [width] = useWindowSize();

    // Копируем и модифицируем content
    const modifiedContent = [...content];
    if (modifiedContent.length % 2 !== 0) {
        modifiedContent.push(['', '']);
    }

    // Создаем result на основе modifiedContent
    const result = modifiedContent.reduce((acc, pair, index, arr) => {
        if (index % 2 === 0) {
            const descriptions = arr[index + 1];
            if (descriptions) {
                pair.forEach((title, i) => {
                    acc.push([title, descriptions[i]]);
                });
            }
        }
        return acc;
    }, []);

    return (
        <>
            {width > 560 && (
                <div className={cl.features}>
                    {result.map((feature, index) => (
                        <div key={`feature-${index}`} className={cl.featureItem}>
                            <span>{feature[0]}</span>
                            <span>{feature[1]}</span>
                        </div>
                    ))}
                </div>
            )}
            {width <= 560 && (
                <div className={cl.features}>
                    {modifiedContent.map((detail, index) => (
                        Array.isArray(detail) && detail.length >= 2 && detail[0] !== '' && detail[1] !== '' && (
                            <div key={`detail-${index}`} className={cl.detailsItemMobile}>
                                <span>{detail[0]}</span>
                                <span>{detail[1]}</span>
                            </div>
                        )
                    ))}
                </div>
            )}
        </>
    );
};

export default MoreFeatures;