import React from 'react';
import cl from './MoreInfoBlocks.module.css';
import { useWindowSize } from "../../../Hooks/useWindowSize";

const MoreFeatures = ({ content }) => {
    const [width] = useWindowSize();

    // Копируем и модифицируем content
    const modifiedContent = [...content];
    if (modifiedContent.length % 2 !== 0) {
        modifiedContent.push({ key: '', value: '' });
    }

    // Создаем result на основе modifiedContent
    const result = [];
    for (let i = 0; i < modifiedContent.length; i += 2) {
        const first = modifiedContent[i];
        const second = modifiedContent[i + 1];
        if (first && second) {
            result.push({
                keys: [first.key, second.key], // Названия
                values: [first.value, second.value], // Значения
            });
        }
    }

    return (
        <>
            {width > 560 && (
                <div className={cl.features}>
                    {result.map((feature, index) => (
                        <>
                            <div key={`feature-${index}`} className={cl.featureItem}>
                                {feature.keys.map((key, i) => (
                                    <span key={`title-${i}`}>{key}</span>
                                ))}
                            </div>
                            <div key={`value-${index}`} className={cl.featureItem}>
                                {feature.values.map((value, i) => (
                                    <span key={`value-${i}`}>{value}</span>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
            )}
            {width <= 560 && (
                <div className={cl.features}>
                    {modifiedContent.map((detail, index) => (
                        detail.key !== '' && detail.value !== '' && (
                            <div key={`detail-${index}`} className={cl.detailsItemMobile}>
                                <span>{detail.key}</span>
                                <span>{detail.value}</span>
                            </div>
                        )
                    ))}
                </div>
            )}
        </>
    );
};

export default MoreFeatures;