
import React from 'react';
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import cl from './Contacts.module.css'
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ContactBlockV2 from "../../Components/Blocks/ContactBlock/ContactBlockV2";
import {useWindowSize} from "../../Hooks/useWindowSize";
const Contacts = () => {
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Контакты', path: '/contacts' },
    ];
    const [width] = useWindowSize();
    const details = [
        ['Полное наименование организации', 'Сокращённое наименование организации'],
        ['Общество с ограниченной ответственностью научно-технический центр «ИНОПТИС»', 'ООО НТЦ «ИНОПТИС»'],

        ['Юридический адрес', 'Почтовый адрес'],
        ['119992, г. Москва, улица Ленинские горы д.1, строение 75-А, этаж 2, помещение IV, комната 13',
        '119992, г. Москва, улица Ленинские горы д.1, строение 75-А, этаж 2, помещение IV, комната 13'],

        ['ИНН', 'КПП'],
        ['7729661114', '772901001'],

        ['ОГРН', 'КПП'],
        ['1107746605636', '772901001'],

        ['ОКАТО', 'ОКПО'],
        ['45268584000', '67933439'],

        ['ОКТМО', 'ОКФС'],
        ['45325000000', '16'],

        ['ОКОПФ', 'ОКВЭД'],
        ['12300', '26.50'],

        ['Регистрационный ПФР', 'Регистрационный ФСС'],
        ['087809072287', '7728039532 77031'],

        ['Генеральный директор', 'Сайт'],
        ['Кузьмина Раиса Вячеславовна', 'www.inoptis.ru'],

        ['Электронная почта', 'Телефон'],
        ['info@inoptis.ru', '+7 (495) 646-05-06']
    ];

    const result = details.reduce((acc, pair, index, arr) => {
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
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Контакты</h1>
                <ContactBlockV2/>
            </div>
            <CallToAction/>
            <div className={cl.details}>
                <h2>Реквизиты</h2>
                {width > 560 &&
                    <div className={cl.detailsContainer}>
                        {details.map((detail, index) => (
                            <div key={index} className={cl.detailsItem}>
                                <span>{detail[0]}</span>
                                <span>{detail[1]}</span>
                            </div>
                        ))}
                    </div>
                }
                {width <= 560 &&
                    <div className={cl.detailsContainer}>
                        {result.map((detail, index) => (
                            <div key={index} className={cl.detailsItemMobile}>
                                <span>{detail[0]}</span>
                                <span>{detail[1]}</span>
                            </div>
                        ))}
                    </div>
                }


            </div>
        </div>
    );
};

export default Contacts;