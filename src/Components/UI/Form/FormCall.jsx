import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useCsrf } from '../../../Context/CSRFContext';
import cl from './Form.module.css';
import ITextArea from '../ITextArea/ITextArea';
import IButton from '../IButton/IButton';

// Регулярное выражение для проверки номера телефона (10-15 цифр)
const phoneRegExp = /^[0-9]{10,15}$/;

// Yup-схема валидации с защитой от HTML-тегов через DOMPurify и honeypot-проверкой
const validationSchema = Yup.object({
    title: Yup.string()
        .required('Обязательное поле')
        .max(80, 'Максимум 80 символов')
        .test('no-html', 'HTML-теги запрещены', value => value === DOMPurify.sanitize(value)),
    name: Yup.string()
        .required('Обязательное поле')
        .max(50, 'Максимум 50 символов')
        .test('no-html', 'HTML-теги запрещены', value => value === DOMPurify.sanitize(value)),
    phone: Yup.string()
        .matches(phoneRegExp, 'Введите корректный номер (10-15 цифр)')
        .required('Обязательное поле'),
    // Honeypot поле — должно оставаться пустым
    honeypot: Yup.string().test('is-empty', 'Бот обнаружен', value => !value)
});

const FormCall = () => {
    const csrfToken = useCsrf();

    // Начальные значения формы, включая honeypot
    const initialValues = {
        title: '',
        name: '',
        phone: '',
        honeypot: ''
    };

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        // Если honeypot заполнен — считаем, что форму заполнил бот
        if (values.honeypot) {
            setStatus({ type: 'error', text: 'Бот обнаружен. Форма не отправлена.' });
            setSubmitting(false);
            return;
        }

        // Очистка данных от потенциальных XSS-атак
        const sanitizedData = {
            title: DOMPurify.sanitize(values.title),
            name: DOMPurify.sanitize(values.name),
            phone: values.phone // Номер телефона не требует очистки
        };

        try {
            const response = await axios.post('/send-form-call.html', sanitizedData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRF-Token': csrfToken
                },
                withCredentials: true
            });

            if (response.data.success) {
                setStatus({ type: 'success', text: response.data.message });
                resetForm();
            } else {
                setStatus({ type: 'error', text: 'Ошибка при отправке формы' });
            }
        } catch (error) {
            setStatus({ type: 'error', text: 'Ошибка при отправке формы' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, status }) => (
                <Form noValidate className={cl.formContent}>
                    <h3 className={cl.title}>Введите данные для заказа обратного звонка:</h3>
                    <div className={cl.fields}>
                        <Field name="title">
                            {({ field, meta }) => (
                                <ITextArea
                                    {...field}
                                    placeholder="Название предприятия *"
                                    type="text"
                                    error={meta.touched && meta.error}
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
                                    maxLength={15}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="phone" component="div" className={cl.error} />

                        {/* Скрытое honeypot поле для защиты от ботов */}
                        <Field name="honeypot" type="text" style={{ display: 'none' }} />
                    </div>

                    <IButton type="submit" disabled={isSubmitting || !csrfToken}>
                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                    </IButton>
                    {status && <div className={cl.message}>{status.text}</div>}
                </Form>
            )}
        </Formik>
    );
};

export default FormCall;
