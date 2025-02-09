import React from 'react';
import cl from "./ContactBlock.module.css";
import bg from "../../../Assets/Pictures/Epattern_left.svg";
import icon1 from "../../../Assets/Pictures/ContactBlock/icon1.svg";
import icon2 from "../../../Assets/Pictures/ContactBlock/icon2.svg";
import icon3 from "../../../Assets/Pictures/ContactBlock/icon3.svg";
// import icon4 from "../../../Assets/Pictures/ContactBlock/icon4.svg";
// import map from '../../../Assets/Pictures/map_test.webp'

const ContactBlockV2 = () => {
    return (
        <div className={cl.blockv2}>
            <div className={cl.contentv2}>
                <div className={cl.textv2}>
                    <img src={bg} className={cl.backgroundv2} alt={'bg'}/>
                    <div className={cl.item}><img src={icon1} alt={'time'}/> Пн–Пт с 9:00 до 18:00</div>
                    <div className={cl.item}><img src={icon2} alt={'phone'}/> +7 (495) 646-05-06</div>
                    <div className={cl.item}><img src={icon3} alt={'email'}/> info@inoptis.ru</div>
                    {/*<div className={cl.item}><img src={icon4} alt={'point'}/> Москва, Высоковольтный проезд, д. 1, стр.*/}
                    {/*    49, офис 326*/}
                    {/*</div>*/}
                </div>
                <div className={cl.mapContainerv2}>
                    {/* <img src={map} alt="map"/> */}
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeaafbe59055abd83788bdb42a08855ea593553afbd6ff95aa1c294941456292f&amp;source=constructor" width="600" height="322" frameborder="0"></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactBlockV2;