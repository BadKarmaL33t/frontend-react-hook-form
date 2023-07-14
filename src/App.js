import React from 'react';
import './App.css';
import {useForm} from "react-hook-form";

function App() {
    const {handleSubmit, formState: {errors, isDirty, isValid}, register, watch} = useForm({mode: 'onChange'});

    const watchDeliveryFrequency = watch('deliveryFrequency');

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                <label htmlFor="name-field">
                    Voornaam:
                </label>
                <input
                    type="text"
                    id="firstname-field"
                    {...register("firstName", {
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        },
                        validate: {
                            matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                            minLength: (v) => v['length'] >= 2 || "vul een geldige naam in",
                            maxLength: (v) => v['length'] <= 50 || "het maximale aantal karakters is bereikt",
                        }
                    })}
                />
                {errors.firstName && <small>{errors.firstName.message}</small>}
                <label htmlFor="lastname-field">
                    Achternaam:
                </label>
                <input
                    type="text"
                    id="lastname-field"
                    {...register("lastName", {
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        },
                        validate: {
                            matchPattern: (v) => /^[a-zA-Z]+$/.test(v) || "dit veld mag geen cijfers bevatten",
                            minLength: (v) => v['length'] >= 2 || "vul een geldige naam in",
                            maxLength: (v) => v['length'] <= 60 || "het maximale aantal karakters is bereikt",
                        }
                    })}
                />
                {errors.lastName && <small>{errors.lastName.message}</small>}
                <label htmlFor="age-field">
                    Leeftijd:
                </label>
                <input
                    type="text"
                    id="age-field"
                    {...register("age", {
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        },
                        validate: {
                            matchPattern: (v) => /^[0-9]+$/.test(v) || "dit veld mag geen letters bevatten",
                            min: (v) => v >= 18 || "je moet minimaal 18 jaar oud zijn",
                        }
                    })}
                />
                {errors.age && <small>{errors.age.message}</small>}
                <label htmlFor="zipcode-field">
                    Postcode:
                </label>
                <input
                    type="text"
                    id="zipcode-field"
                    {...register("zipcode", {
                        required: {
                            value: true,
                            minlength: 6,
                            message: 'Dit veld is verplicht',
                        },
                        validate: {
                            maxLength: (v) => v['length'] <= 7 || "deze postcode bevat teveel tekens",
                            matchPattern: (v) => /^[1-9][0-9]{3} ?(?!sa|sd|ss|SA|SD|SS)[A-Za-z]{2}$/.test(v) || "dit is geen geldige postcode",
                        }
                    })}
                />
                {errors.zipcode && <small>{errors.zipcode.message}</small>}
                <label htmlFor="delivery-frequency-selector">
                    Bezorgfrequentie:
                </label>
                <select
                    id="delivery-frequency-selector"
                    {...register("deliveryFrequency", {
                        required: {
                            value: true,
                            message: 'Dit veld is verplicht',
                        },
                        validate: {
                            value: (v) => v !== "Select..." || "selecteer een bezorgfrequentie",
                        }
                    })}
                >
                    <option value="Select...">Select...</option>
                    <option value="weekly">iedere week</option>
                    <option value="every-other-week">om de week</option>
                    <option value="monthly">iedere maand</option>
                    <option value="other">anders</option>
                </select>
                {errors.deliveryFrequency && <small>{errors.deliveryFrequency.message}</small>}

                {watchDeliveryFrequency === "other" &&
                    <label htmlFor="custom-frequency-textarea">
                        Specificeer andere bezorgfrequentie:
                    </label>
                }
                {watchDeliveryFrequency === "other" &&
                    <textarea
                        {...register("customDeliveryFrequency")}
                        rows="1"
                        cols="50"
                        maxLength="50"
                    >
                </textarea>
                }
                <label htmlFor="remarks-textarea">
                    Opmerking:
                </label>
                <textarea
                    {...register("remarks")}
                    rows="5"
                    cols="50"
                    maxLength="250"
                    placeholder="Plaats hier uw aanvullende opmerkingen."
                >
                        </textarea>
                <label htmlFor="conditions-checkbox">
                    <input
                        type="checkbox"
                        id="conditions-checkbox"
                        {...register("conditions", {
                            required: {
                                checked: true,
                                message: 'Dit veld is verplicht',
                            },
                            validate: {
                                checked: (v) => v || "ga akkoord met de algemene voorwaarden om te verzenden",
                            }
                        })}
                    />
                    {errors.zipcode && <small>{errors.zipcode.message}</small>}
                    Akkoord met de algemene voorwaarden.
                </label>
                <button
                    type="submit"
                    id="send-form-button"
                    disabled={!isDirty || !isValid}
                >
                    Verzenden
                </button>
            </form>
        </>
    )
        ;
}

export default App;
