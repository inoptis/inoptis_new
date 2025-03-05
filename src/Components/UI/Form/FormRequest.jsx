import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DOMPurify from "dompurify";
import axios from "axios";
import { useCsrf } from "../../../Context/CSRFContext";
import cl from "./Form.module.css";
import fileIcon from "../../../Assets/Pictures/file.svg";
import ITextArea from "../ITextArea/ITextArea";
import IButton from "../IButton/IButton";

// Регулярное выражение для проверки номера телефона (10-15 цифр)
const phoneRegExp = /^[0-9]{10,15}$/;

// Yup-схема валидации с проверками и защитой от XSS через DOMPurify
const validationSchema = Yup.object({
    title: Yup.string()
        .required("Название предприятия обязательно")
        .max(80, "Максимум 80 символов")
        .test("no-html", "HTML-теги запрещены", value =>
            value === DOMPurify.sanitize(value || "")
        ),
    name: Yup.string()
        .required("ФИО обязательно")
        .max(50, "Максимум 50 символов")
        .test("no-html", "HTML-теги запрещены", value =>
            value === DOMPurify.sanitize(value || "")
        ),
    phone: Yup.string()
        .required("Введите корректный номер телефона")
        .matches(phoneRegExp, "Введите корректный номер телефона"),
    email: Yup.string()
        .required("Введите корректный email")
        .email("Введите корректный email")
        .max(30, "Максимум 30 символов"),
    comment: Yup.string()
        .max(200, "Максимум 200 символов")
        .test("no-html", "HTML-теги запрещены", value =>
            value === DOMPurify.sanitize(value || "")
        ),
    file: Yup.mixed()
});

const FormRequest = () => {
    const csrfToken = useCsrf();
    const [fileName, setFileName] = useState("");

    const initialValues = {
        title: "",
        name: "",
        phone: "",
        email: "",
        comment: "",
        file: null
    };

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        // Очищаем текстовые поля от потенциальных XSS-атак
        const sanitizedData = {
            title: DOMPurify.sanitize(values.title),
            name: DOMPurify.sanitize(values.name),
            phone: values.phone,
            email: DOMPurify.sanitize(values.email),
            comment: DOMPurify.sanitize(values.comment)
        };

        const formDataToSend = new FormData();
        formDataToSend.append("title", sanitizedData.title);
        formDataToSend.append("name", sanitizedData.name);
        formDataToSend.append("phone", sanitizedData.phone);
        formDataToSend.append("email", sanitizedData.email);
        formDataToSend.append("comment", sanitizedData.comment);
        if (values.file) {
            formDataToSend.append("file", values.file);
        }

        try {
            const response = await axios.post("/send-form-request.html", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-Token": csrfToken
                },
                withCredentials: true
            });

            if (response.data.success) {
                setStatus("Форма успешно отправлена!");
                resetForm();
                setFileName("");
            } else {
                setStatus("Ошибка при отправке формы. Попробуйте позже.");
            }
        } catch (error) {
            setStatus("Ошибка при отправке формы. Попробуйте позже.");
            console.error(error);
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status, setFieldValue }) => (
                <Form noValidate className={cl.formContent}>
                    <h3 className={cl.title}>Введите данные для оформления заявки:</h3>
                    <div className={cl.fields}>
                        <Field name="title">
                            {({ field, meta }) => (
                                <ITextArea
                                    {...field}
                                    placeholder="Название предприятия *"
                                    type="text"
                                    error={meta.touched && meta.error}
                                    required
                                    maxLength={80}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="title" component="div" className={cl.error} />

                        <Field name="name">
                            {({ field, meta }) => (
                                <ITextArea
                                    {...field}
                                    placeholder="ФИО контактного лица *"
                                    type="text"
                                    error={meta.touched && meta.error}
                                    required
                                    maxLength={50}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="name" component="div" className={cl.error} />

                        <Field name="phone">
                            {({ field, meta }) => (
                                <ITextArea
                                    {...field}
                                    placeholder="Номер телефона *"
                                    type="tel"
                                    error={meta.touched && meta.error}
                                    required
                                    maxLength={15}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="phone" component="div" className={cl.error} />

                        <Field name="email">
                            {({ field, meta }) => (
                                <ITextArea
                                    {...field}
                                    placeholder="Адрес электронной почты *"
                                    type="email"
                                    error={meta.touched && meta.error}
                                    required
                                    maxLength={30}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="email" component="div" className={cl.error} />

                        <Field name="comment">
                            {({ field, meta }) => (
                                <ITextArea
                                    {...field}
                                    placeholder="Комментарий"
                                    type="textarea"
                                    error={meta.touched && meta.error}
                                    maxLength={200}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="comment" component="div" className={cl.error} />
                    </div>

                    <div className={cl.fileUpload}>
                        <input
                            type="file"
                            id="fileUpload"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setFieldValue("file", file);
                                setFileName(file ? file.name : "");
                            }}
                            className={cl.hiddenInput}
                        />
                        <label htmlFor="fileUpload" className={cl.customFile}>
                            <img src={fileIcon} alt="file" />
                            <span>{fileName || "Загрузить файл"}</span>
                        </label>
                    </div>

                    <IButton type="submit" disabled={isSubmitting || !csrfToken}>
                        {isSubmitting ? "Отправка..." : "Отправить заявку"}
                    </IButton>

                    {status && <p className={cl.message}>{status}</p>}
                </Form>
            )}
        </Formik>
    );
};

export default FormRequest;
