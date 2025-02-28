import React, { useState } from "react";
import cl from "./Form.module.css";
import fileIcon from "../../../Assets/Pictures/file.svg";
import ITextArea from "../ITextArea/ITextArea";
import IButton from "../IButton/IButton";
import axios from "axios";
import {useCsrf} from "../../../Context/CSRFContext";

const FormRequest = () => {
    const csrfToken = useCsrf(); // Получаем токен из контекста
    const [formData, setFormData] = useState({
        title: "",
        name: "",
        phone: "",
        email: "",
        comment: "",
        file: null
    });

    const [errors, setErrors] = useState({});
    const [fileName, setFileName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^[0-9]{10,15}$/.test(phone);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : "");
        setFormData({ ...formData, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);

        let newErrors = {};
        if (!formData.title) newErrors.title = "Название предприятия обязательно";
        if (!formData.name) newErrors.name = "ФИО обязательно";
        if (!formData.phone || !validatePhone(formData.phone)) newErrors.phone = "Введите корректный номер телефона";
        if (!formData.email || !validateEmail(formData.email)) newErrors.email = "Введите корректный email";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("comment", formData.comment);
        if (formData.file) {
            formDataToSend.append("file", formData.file);
        }

        try {
            const response = await axios.post("/send-form-request.html", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-Token": csrfToken // Передаём CSRF-токен
                },
                withCredentials: true
            });

            if (response.data.success) {
                setMessage("Форма успешно отправлена!");
                setFormData({ title: "", name: "", phone: "", email: "", comment: "", file: null });
                setFileName("");
            } else {
                setMessage("Ошибка при отправке формы. Попробуйте позже.");
            }
        } catch (error) {
            setMessage("Ошибка при отправке формы. Попробуйте позже.");
            console.error(error);
        }
        setIsSubmitting(false);
    };

    return (
        <form noValidate className={cl.formContent} onSubmit={handleSubmit}>
            <h3 className={cl.title}>Введите данные для оформления заявки:</h3>
            <div className={cl.fields}>
                <ITextArea placeholder="Название предприятия *" type="text" value={formData.title} onChange={handleChange} name="title" error={!!errors.title} required maxLength={80} />
                <ITextArea placeholder="ФИО контактного лица *" type="text" value={formData.name} onChange={handleChange} name="name" error={!!errors.name} required maxLength={50} />
                <ITextArea placeholder="Номер телефона *" type="tel" value={formData.phone} onChange={handleChange} name="phone" error={!!errors.phone} required maxLength={15}/>
                <ITextArea placeholder="Адрес электронной почты *" type="email" value={formData.email} onChange={handleChange} name="email" error={!!errors.email} required maxLength={30}/>
                <ITextArea placeholder="Комментарий" type="textarea" value={formData.comment} onChange={handleChange} name="comment" required={false} maxLength={200} />
            </div>

            <div className={cl.fileUpload}>
                <input type="file" id="fileUpload" onChange={handleFileChange} className={cl.hiddenInput} />
                <label htmlFor="fileUpload" className={cl.customFile}>
                    <img src={fileIcon} alt="file" />
                    <span>{fileName || "Загрузить файл"}</span>
                </label>
            </div>

            <IButton type="submit" disabled={isSubmitting || !csrfToken}>
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </IButton>

            {message && <p className={cl.message}>{message}</p>}
        </form>
    );
};

export default FormRequest;
