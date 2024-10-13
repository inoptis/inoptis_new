import React from 'react';
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
    return (
        <div className={cl.block}>
            <h2>Уже работают с нами:</h2>
            <div className={cl.container}>
                {test.map((testitem, index) => (
                    <img src={testitem} key={index} alt={'parthner'}/>
                ))}
            </div>
        </div>
    );
};

export default PartnersBlock;