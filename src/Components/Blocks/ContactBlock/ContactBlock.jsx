import React from 'react';
import cl from './ContactBlock.module.css'
import icon1 from '../../../Assets/Pictures/ContactBlock/icon1.svg'
import icon2 from '../../../Assets/Pictures/ContactBlock/icon2.svg'
import icon3 from '../../../Assets/Pictures/ContactBlock/icon3.svg'
import icon4 from '../../../Assets/Pictures/ContactBlock/icon4.svg'
import arrow from '../../../Assets/Pictures/arrow-right-contact.svg'
import bg from '../../../Assets/Pictures/Epattern_left.svg'
import YandexMap from "../../MapTest";
const ContactBlock = () => {
    return (
        <div className={cl.block}>
            <img src={bg} className={cl.background} alt={'bg'}/>
            <div className={cl.content}>
                <div className={cl.text}>
                    <h2>Как с нами связаться:</h2>
                    <div className={cl.item}><img src={icon1} alt={'time'}/> Пн–Пт с 9:00 до 18:00 </div>
                    <div className={cl.item}><img src={icon2} alt={'phone'}/> +7 (495) 646-05-06 </div>
                    <div className={cl.item}><img src={icon3} alt={'email'}/> info@inoptis.ru </div>
                    <div className={cl.item}><img src={icon4} alt={'point'}/> Москва, Высоковольтный проезд, д. 1, стр. 49, офис 326 </div>
                    <div className={cl.item}>Перейти к реквизитам <img src={arrow} alt={'arrow'}/></div>
                </div>
                <div className={cl.mapContainer}>
                    {/*<YandexMap/>*/}
                    <script type="text/javascript" charSet="utf-8" async
                            src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aeaafbe59055abd83788bdb42a08855ea593553afbd6ff95aa1c294941456292f&amp;width=100%25&amp;height=304&amp;lang=ru_RU&amp;scroll=true"></script>
                </div>
            </div>
        </div>
    );
};

export default ContactBlock;