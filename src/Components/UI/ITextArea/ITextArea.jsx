import React from "react";
import cl from "./ITextArea.module.css";
import cross from "../../../Assets/Pictures/cross.svg";
import warning from "../../../Assets/Pictures/warning-filled.svg";

const ITextArea = ({
                       placeholder,
                       type = "text",
                       value,
                       onChange,
                       name,
                       error,
                       required,
                       maxLength = 200, // Ограничение по умолчанию
                   }) => {
    const inputClass = error ? `${cl.text} ${cl.error}` : cl.text;

    // Обработчик изменения, чтобы ограничить длину вручную
    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            onChange(e);
        }
    };

    if (type === "textarea") {
        return (
            <div className={cl.box}>
        <textarea
            className={`${inputClass} ${cl.textarea}`}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            required={required}
            maxLength={maxLength}
        />
                {value !== "" && (
                    <button
                        onClick={() => onChange({ target: { name, value: "" } })}
                        className={cl.cross}
                    >
                        <img src={cross} alt="cross" />
                    </button>
                )}
                <span className={cl.charCount}>
          {value.length}/{maxLength}
        </span>
            </div>
        );
    }

    return (
        <div className={cl.box}>
            <input
                className={inputClass}
                type={type}
                value={value}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                required={required}
                maxLength={maxLength}
            />
            {value !== "" && !error && (
                <button
                    onClick={() => onChange({ target: { name, value: "" } })}
                    className={cl.cross}
                >
                    <img src={cross} alt="cross" />
                </button>
            )}
            {error && <img src={warning} alt="cross" className={cl.warning} />}
            <span className={cl.charCount}>
        {value.length}/{maxLength}
      </span>
        </div>
    );
};

export default ITextArea;
