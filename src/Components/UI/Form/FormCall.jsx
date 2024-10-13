import React, {useState} from 'react';
import cl from "./Form.module.css";
import ITextArea from "../ITextArea/ITextArea";
import IButton from "../IButton/IButton";

const FormCall = () => {

    const [formData, setFormData] = useState({
        title: '', // Название предприятия
        name: '',  // ФИО контактного лица
        phone: '', // Номер телефона
        email: '', // Электронная почта
        comment: '', // Комментарий
        file: null  // Файл
    });

    const [errors, setErrors] = useState({
        title: false,
        name: false,
        phone: false,
        email: false,
        comment: false,
        file: false
    });

    const validatePhone = (phone) => {
        const re = /^[0-9]{10,15}$/;
        alert("Неправильно введен номер телефона!")
        return re.test(String(phone));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: false
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        // Проверка обязательных полей
        if (formData.title === '') {
            setErrors((prev) => ({ ...prev, title: true }));
            valid = false;
        }
        if (formData.name === '') {
            setErrors((prev) => ({ ...prev, name: true }));
            valid = false;
        }
        if (formData.phone === '' || !validatePhone(formData.phone)) {
            setErrors((prev) => ({ ...prev, phone: true }));
            valid = false;
        }

        if (valid) {
            alert('Форма успешно отправлена!');
            console.log(formData); // Можно заменить на API-запрос
        }
    };
    return (
        <form noValidate={true} className={cl.formContent} onSubmit={handleSubmit}>
            <h3 className={cl.title}>Введите данные для заказа обратного звонка:</h3>
            <div className={cl.fields}>
                <ITextArea
                    placeholder="Название предприятия"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                    error={errors.title}
                    required={true}
                />
                <ITextArea
                    placeholder="ФИО контактного лица"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    error={errors.name}
                    required={true}
                />
                <ITextArea
                    placeholder="Номер телефона"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    error={errors.phone}
                    required={true}
                />
            </div>
            <IButton type="submit" className="submit-btn">
                Отправить заявку
            </IButton>
        </form>
    );
};

export default FormCall;