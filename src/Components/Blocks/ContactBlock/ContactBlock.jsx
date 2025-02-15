import React, { useState, useEffect } from 'react';
import cl from './ContactBlock.module.css'
import icon1 from '../../../Assets/Pictures/ContactBlock/icon1.svg'
import icon2 from '../../../Assets/Pictures/ContactBlock/icon2.svg'
import icon3 from '../../../Assets/Pictures/ContactBlock/icon3.svg'
import arrow from '../../../Assets/Pictures/arrow-right-contact.svg'
import bg from '../../../Assets/Pictures/Epattern_left.svg'
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../Hooks/useWindowSize";


const ContactBlock = () => {
    const navigate = useNavigate();
    const [width] = useWindowSize();
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        const data = {
            default: { // 1440 и больше
                src: "https://yandex.ru/map-widget/v1/?um=constructor%3Aeaafbe59055abd83788bdb42a08855ea593553afbd6ff95aa1c294941456292f&amp;source=constructor",
                width: 650,
                height: 372
            },
            '1400-961': { // 1400-961
                src: "https://yandex.ru/map-widget/v1/?um=constructor%3A9ed56d85e21926d84494656d48c5c97ccdbfbf8695ec34f3ac23789bd4a8098e&amp;source=constructor",
                width: 486,
                height: 278
            },
            '960-561': { // 960-561
                src: "https://yandex.ru/map-widget/v1/?um=constructor%3Aae2261098288ccda7e7da42a6ce2a3f9066e2f8496e036f08298761cea6f5418&amp;source=constructor",
                width: 226,
                height: 198
            },
            '560': { // 560 и меньше
                src: "https://yandex.ru/map-widget/v1/?um=constructor%3A804791f2682d5a6a05301398fe2a851e5fd5111924bc56001bc58afeeee0f589&amp;source=constructor",
                width: "100%",
                height: 278
            }
        };

        let currentMapData = data.default;
        if (width <= 1400 && width > 960)
            currentMapData = data['1400-961'];
        else if (width <= 960 && width > 560)
            currentMapData = data['960-561'];
        else if (width <= 560)
            currentMapData = data['560'];

        setMapData(currentMapData);
    }, [width]);

    return (
        <div className={cl.block}>
            <img src={bg} className={cl.background} alt={'bg'}/>
            <div className={cl.content}>
                <div className={cl.text}>
                    <h2>Как с нами связаться:</h2>
                    <div className={cl.item}><img src={icon1} alt={'time'}/> Пн–Пт с 9:00 до 18:00 </div>
                    <div className={cl.item}><img src={icon2} alt={'phone'}/> +7 (495) 646-05-06 </div>
                    <div className={cl.item}><img src={icon3} alt={'email'}/> info@inoptis.ru </div>
                    {/*<div className={cl.item}><img src={icon4} alt={'point'}/> Москва, Высоковольтный проезд, д. 1, стр. 49, офис 326 </div>*/}
                    <div className={cl.item} onClick={() => navigate('/contacts')}>Перейти к реквизитам <img src={arrow} alt={'arrow'}/></div>
                </div>
                {mapData && (
                    <div className={cl.mapContainer}>
                        <iframe
                            title="Карта местоположения"
                            src={mapData.src}
                            width={mapData.width}
                            height={mapData.height}
                            frameborder="0"
                            style={{borderRadius: 20}}
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactBlock;