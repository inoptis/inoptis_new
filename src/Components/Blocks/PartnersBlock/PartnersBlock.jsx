import React, {useEffect, useRef, useState} from 'react';
import cl from './PartnersBlock.module.css'
import test1 from '../../../Assets/Pictures/Test/logo_1.svg'
import test2 from '../../../Assets/Pictures/Test/logo_2.svg'
import test3 from '../../../Assets/Pictures/Test/logo_3.svg'
import test4 from '../../../Assets/Pictures/Test/logo_4.svg'
import test5 from '../../../Assets/Pictures/Test/logo_5.svg'
import test6 from '../../../Assets/Pictures/Test/logo_6.svg'
import test7 from '../../../Assets/Pictures/Test/logo_7.svg'
const PartnersBlock = () => {

    const test = [test1,test2,test3,test4,test5,test6,test7]
    const carouselRef = useRef(null);
    const requestRef = useRef();
    const speed = 1; // Настройте скорость по своим нуждам
    const [items,] = useState([...test, ...test, ...test])

    useEffect(() => {
        const updateScrollPosition = () => {
            if (carouselRef.current) {
                // Сдвигаем карусель влево
                carouselRef.current.scrollLeft += speed;

                if ((carouselRef.current.scrollLeft) >= carouselRef.current.scrollWidth / 3 ) {
                    // Сбрасываем позицию скролла в начальное положение
                    carouselRef.current.scrollLeft = 0;
                }
            }
            requestRef.current = requestAnimationFrame(updateScrollPosition);
        };

        requestRef.current = requestAnimationFrame(updateScrollPosition);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []); // Пустой массив зависимостей для инициализации один раз

    return (
        <div className={cl.block}>
            <h2>Уже работают с нами:</h2>
            <div className={cl.container}>
                <div className={cl.carusel} ref={carouselRef}>
                    {items.map((testitem, index) => (
                        <img src={testitem} key={index} alt={'parthner'}/>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default PartnersBlock;