import React from 'react';
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ContactBlock from "../../Components/Blocks/ContactBlock/ContactBlock";
import cl from './Catalog.module.css'
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {testCategories} from "../../utils/TestCategories";
import {useWindowSize} from "../../Hooks/useWindowSize";
import {useNavigate} from "react-router-dom";
const Catalog = () => {
    const [width] = useWindowSize()
    const navigate = useNavigate()
    const breadcrumbs = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
    ];
    const categories = testCategories
    return (
        <div className={'page'}>
            <div className={cl.mainBlock}>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <h1>Каталог</h1>
                {width > 560 &&
                    <div className={cl.container}>
                        {categories.map((category, index) => (
                            <div className={cl.item} key={index}>
                                <h4 onClick={()=>navigate('/catalog/subcatalog')}>{category.name}</h4>
                                <div className={cl.containerChildren}>
                                    {category.children.map((name, index) => (
                                        <span className={cl.children} key={index}>{name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {width <= 560 &&
                    <div className={cl.container}>
                        {categories.map((category, index) => (
                            <div className={cl.item} key={index}>
                                <h4>{category.name}</h4>
                                <div className={cl.containerChildren}>
                                    {category.children.map((name, index) => (
                                        <span className={cl.children} key={index}>{name}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <CallToAction/>
            <ContactBlock/>
        </div>
    );
};

export default Catalog;