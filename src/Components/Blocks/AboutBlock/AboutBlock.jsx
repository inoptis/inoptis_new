import React from 'react';
import cl from './AboutBlock.module.css'
import chti from '../../../Assets/Pictures/CHTI.webp'
const AboutBlock = () => {
    return (
        <div className={cl.block}>
            <div className={cl.content}>
                <div className={cl.text}>
                    <h2>Что такое Иноптис?</h2>
                    <p><b>НТЦ «ИНОПТИС»</b> — детище команды профессионалов, любящих решать сложные задачи. Нас вдохновляют технические вызовы, и наш опыт позволяет нам успешно справляться с ними. </p>
                    <p>С момента основания компания занималась разработкой оптических датчиков, но в 2018 следуя тенденциям времени вектор производства и разработок решили изменить
                        на так необходимое стране направление как КИПиА.</p>
                </div>
                <img src={chti} alt={'Что такое иноптис?'}/>
            </div>
        </div>
    );
};

export default AboutBlock;