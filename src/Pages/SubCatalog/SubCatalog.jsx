import React, {useState} from 'react';
import cl from './SubCatalog.module.css'
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import testimg from '../../Assets/Pictures/TestProduct/picture.png'
import ProductCard from "../../Components/ProductCard/ProductCard";
import {testCategories} from "../../utils/TestCategories";
import arrow from '../../Assets/Pictures/arrow-filter.svg'
import arrowdark from '../../Assets/Pictures/arrow-filter-dark.svg'
const SubCatalog = () => {
    const [active, setActive] = useState(['Расход', 'Ультразвуковые расходомеры жидкости (врезные)'])
    const [isOpen, setIsOpen] = useState(testCategories.map(() => false));
    const toggleSection = (index) => {
        setIsOpen(prevState =>
            prevState.map((state, idx) => idx === index ? !state : state)
        );
    };
    const clickItem = (category, item) => {
        setActive([category, item])
    };

    const testProduct = {
        img: testimg,
        name: 'ТЭК-МПУ-2Б-...-РБРБД - магнитный указатель уровня с дополнительной камерой',
        category: 'Микроимпульсные уровнемеры'
    }
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Ультразвуковые расходомеры жидкости (врезные)', path:'/catalog/subcatalog'}
    ];
    return (
        <div className='page'>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Ультразвуковые расходомеры жидкости (врезные)</h1>
                <p>Магнитные указатели уровня жидкости основаны на принципе перемещения магнитного индикатора внутри трубки и обеспечивают надежное и ясное отображение уровня жидкости в резервуарах.</p>
                <div className={cl.catalogContainer}>
                    <div className={cl.filter}>
                        {testCategories.map((category, index) => (
                            <div className={cl.filterItem} key={index}>
                                <div className={`${cl.mainItem} ${active[0] === category.name ? cl.active : ''}`} onClick={() => toggleSection(index)}>
                                   <span>{category.name}</span>
                                    <img className={isOpen[index] ?  '' : cl.rotate} src={active[0] === category.name ? arrow : arrowdark} alt='arrow'/>
                                </div>
                                <div className={`${cl.filterContainer} ${isOpen[index] ? cl.open : cl.close}`}>
                                    {category.children.map((item, index) => (
                                        <div className={`${cl.item} ${active[1] === item ? cl.active : ''}`} key={index} onClick={() => clickItem(category.name, item)}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cl.productContainer}>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                        <ProductCard product={testProduct}/>
                    </div>
                </div>
            </div>
            <CallToAction/>
        </div>
    );
};

export default SubCatalog;