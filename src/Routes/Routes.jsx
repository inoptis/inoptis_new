import  React, {useEffect} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {InfoRoutes} from "./index";

const MyRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <TransitionGroup>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    key={location.key}
                    classNames="fadePages"
                    timeout={300}
                >
                    <Routes location={location}>
                        {InfoRoutes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </CSSTransition>
            </SwitchTransition>
        </TransitionGroup>
    );
};

export default MyRoutes;