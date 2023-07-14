import React, { useEffect } from 'react';

function TextInput({ label, labelText, name, register, errors, customValidateParams }) {
    useEffect(() => {
        register(name);
    }, [name, register, errors]);

    const validationParams = {
        required: {
            value: true,
            message: 'Dit veld is verplicht',
        },
        validate: {}
    };

    if (customValidateParams) {
        validationParams.validate = customValidateParams;
    }

    return (
        <>
            <label htmlFor={label}>{labelText}</label>
            <input
                type="text"
                id={label}
                {...register(name, validationParams)}
            />
            {errors[name] && <small>{errors[name].message}</small>}
        </>
    );
}

export default TextInput;