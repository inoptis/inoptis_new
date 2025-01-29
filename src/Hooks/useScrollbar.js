import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

const useScrollbar = (root, config = {}, hasScroll = true) => {
    useEffect(() => {
        let scrollbars;

        if (root.current && hasScroll) {
            scrollbars = OverlayScrollbars(root.current, config);
        }

        return () => {
            if (scrollbars) {
                scrollbars.destroy();
            }
        };
    }, [root, config, hasScroll]); // Добавлены зависимости
};

export { useScrollbar };
