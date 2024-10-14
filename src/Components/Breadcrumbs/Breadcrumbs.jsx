import React from 'react';
import { Link } from 'react-router-dom';
import  cl from './Breadcrumbs.module.css'
import arrow from '../../Assets/Pictures/arrow-breadcrumbs.svg'
const Breadcrumbs = ({ breadcrumbs }) => {
    return (
        <nav aria-label="breadcrumb" className={cl.block}>
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                    <span
                        key={crumb.path}
                        className={cl.item}
                        aria-current={isLast ? 'page' : undefined}
                    >
                            {!isLast ? (
                                <React.Fragment key={crumb.path}>
                                    <span className={cl.elem}>
                                        <Link className={cl.link} to={crumb.path}>{crumb.title}</Link>
                                        <img src={arrow} className={cl.separator} alt={'arrow'}/>
                                    </span>
                                </React.Fragment>
                            ) : (
                                <span className={cl.link} key={crumb.path}>{crumb.title}</span>
                            )}
                        </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
