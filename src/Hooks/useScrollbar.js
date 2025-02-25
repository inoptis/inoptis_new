import { useEffect, useRef } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const useScrollbar = (root, config = {}) => {
    const initialRootRef = useRef(root);
    const initialConfigRef = useRef(config);

    useEffect(() => {
        let scrollbars;

        if (initialRootRef.current.current) {
            scrollbars = OverlayScrollbars(initialRootRef.current.current, initialConfigRef.current);
        }

        return () => {
            if (scrollbars) {
                scrollbars.destroy();
            }
        };
    }, []); // Пустой массив зависимостей: хук сработает только при монтировании
};

export { useScrollbar };