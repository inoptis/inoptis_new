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
    const result = modifiedContent.reduce((acc, pair, index, arr) => {
        if (index % 2 === 0) {
            const nextPair = arr[index + 1];
            if (nextPair) {
                acc.push({ key: pair.key, value: pair.value });
                acc.push({ key: nextPair.key, value: nextPair.value });
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
                            <span>{feature.key}</span>
                            <span>{feature.value}</span>
                        </div>
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