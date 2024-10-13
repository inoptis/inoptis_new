import React, { useEffect, useRef } from 'react';

const YandexMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        // Проверяем, что скрипт Яндекс.Карт загружен
        if (!window.ymaps) {
            return;
        }

        // Загружаем карту после рендера компонента
        window.ymaps.ready(init);

        function init() {
            const map = new window.ymaps.Map(mapRef.current, {
                center: [55.751574, 37.573856], // Координаты Москвы
                zoom: 10,
            });

            // Добавим метку на карту
            const placemark = new window.ymaps.Placemark([55.751574, 37.573856], {
                hintContent: 'Москва!',
                balloonContent: 'Столица России',
            });

            map.geoObjects.add(placemark);
        }
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '339px' }} />;
};

export default YandexMap;
