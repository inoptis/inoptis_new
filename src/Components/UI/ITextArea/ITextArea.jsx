import React from 'react';
import cl from './ITextArea.module.css';
import cross from '../../../Assets/Pictures/cross.svg';
import warning from '../../../Assets/Pictures/warning-filled.svg'

const ITextArea = ({ placeholder, type = 'text', value, onChange, name, error, required }) => {
    const inputClass = error ? `${cl.text} ${cl.error}` : cl.text;

    // Если тип textarea — отрендерим многострочное поле
    if (type === 'textarea') {
        return (
            <div className={cl.box}>
                <textarea
                    className={`${inputClass} ${cl.textarea}`}
                    value={value}
                    onChange={onChange}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                />
                {value !== '' && (
                    <button onClick={() => onChange({ target: { name, value: '' } })} className={cl.cross}>
                        <img src={cross} alt="cross" />
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className={cl.box}>
            <input
                className={inputClass}
                type={type}
                value={value}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                required={required}
            />
            {value !== '' && !error && (
                <button onClick={() => onChange({ target: { name, value: '' } })} className={cl.cross}>
                    <img src={cross} alt="cross" />
                </button>
            )}
            {error && (
                <img src={warning} alt="cross" className={cl.warning}/>
            )}
        </div>
    );
};

export default ITextArea;
