import React, { useState } from 'react';
import cl from "./Form.module.css";
import ITextArea from "../ITextArea/ITextArea";
import IButton from "../IButton/IButton";
import axios from "axios";
import {useCsrf} from "../../../Context/CSRFContext";


const FormCall = () => {
    const csrfToken = useCsrf(); // Получаем токен из контекста
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        title: false,
        name: false,
        phone: false
    });

    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validatePhone = (phone) => {
        const re = /^[0-9]{10,15}$/;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;

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
            setIsSubmitting(true);
            try {
                const response = await axios.post('/send-form-call.html', formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': csrfToken // Передаём CSRF-токен в заголовке
                    },
                    withCredentials: true
                });

                if (response.data.success) {
                    setMessage({ type: "success", text: response.data.message });
                    setFormData({ title: '', name: '', phone: '' });
                } else {
                    setMessage({ type: "error", text: "Ошибка при отправке формы" });
                }
            } catch (error) {
                setMessage({ type: "error", text: "Ошибка при отправке формы" });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form noValidate className={cl.formContent} onSubmit={handleSubmit}>
            <h3 className={cl.title}>Введите данные для заказа обратного звонка:</h3>
            <div className={cl.fields}>
                <ITextArea
                    placeholder="Название предприятия *"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                    error={errors.title}
                    required
                    maxLength={80}
                />
                <ITextArea
                    placeholder="ФИО контактного лица *"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    error={errors.name}
                    required
                    maxLength={50}
                />
                <ITextArea
                    placeholder="Номер телефона *"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    name="phone"
                    error={errors.phone}
                    required
                    maxLength={15}
                />
            </div>
            <IButton type="submit" disabled={isSubmitting || !csrfToken}>
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </IButton>
            {message && (
                <div className={cl.message}>
                    {message.text}
                </div>
            )}
        </form>
    );
};

export default FormCall;
