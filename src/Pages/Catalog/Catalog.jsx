import React, {useEffect, useState} from 'react';
import CallToAction from "../../Components/Blocks/CallToAction/CallToAction";
import ContactBlock from "../../Components/Blocks/ContactBlock/ContactBlock";
import axios from "axios";

const Catalog = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // URL API ресурса
        const apiURL = 'http://alexaksa.beget.tech/api.html';

        // Запрос через Axios
        axios.get(apiURL)
            .then(response => {
                setData(response.data); // Устанавливаем данные из API в состояние
                setLoading(false); // Завершаем загрузку
            })
            .catch(error => {
                setError(error.message); // Устанавливаем сообщение об ошибке
                setLoading(false); // Завершаем загрузку
            });
    }, []); // Пустой массив зависимостей - useEffect выполнится один раз при монтировании компонента

    if (loading) {
        return <p>Загрузка...</p>; // Показываем сообщение о загрузке, пока данные не пришли
    }

    if (error) {
        return <p>Ошибка: {error}</p>; // Показываем сообщение об ошибке, если что-то пошло не так
    }

    return (
        <div className={'page'}>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        {item.name}: {item.description}
                    </li>
                ))}
            </ul>
            <CallToAction/>
            <ContactBlock/>
        </div>
    );
};

export default Catalog;