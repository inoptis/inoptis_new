import React, { useState } from 'react';
import cl from './Form.module.css';
import file from '../../../Assets/Pictures/file.svg'
import ITextArea from '../ITextArea/ITextArea';
import IButton from '../IButton/IButton';

const FormRequest = () => {
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

    const [fileName, setFileName] = useState('')
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        alert("Неправильно введен email!")
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10,15}$/;  // Допустим только цифры и минимум 10 символов
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); // Сохраняем имя файла
        } else {
            setFileName(''); // Если файл не выбран, сбрасываем имя
        }
        setFormData({
            ...formData,
            file: file
        });
        setErrors({
            ...errors,
            file: !file // Ошибка, если файл не выбран
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
        if (formData.email === '' || !validateEmail(formData.email)) {
            setErrors((prev) => ({ ...prev, email: true }));
            valid = false;
        }

        if (valid) {
            alert('Форма успешно отправлена!');
            console.log(formData); // Можно заменить на API-запрос
        }
    };

    return (
        <form noValidate={true} className={cl.formContent} onSubmit={handleSubmit}>
            <h3 className={cl.title}>Введите данные для оформления заявки:</h3>
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
                <ITextArea
                    placeholder="Адрес электронной почты"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    error={errors.email}
                    required={true}
                />
                <ITextArea
                    placeholder="Комментарий"
                    type="textarea"
                    value={formData.comment}
                    onChange={handleChange}
                    name="comment"
                    required={false}
                    error={errors.comment}
                />
            </div>
            <div className={`${cl.fileUpload}`}>
                <input
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                    className={cl.hiddenInput} // Скрываем стандартный input
                />
                <label htmlFor="fileUpload" className={cl.customFile}>
                    <img src={file} alt={'file'}/>
                    <span>{fileName ? `${fileName}` : 'Загрузить файл'}</span>
                </label>
            </div>
            <IButton type="submit">
                Отправить заявку
            </IButton>
        </form>
    );
};

export default FormRequest;
