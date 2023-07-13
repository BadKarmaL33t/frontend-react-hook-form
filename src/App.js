import React from 'react';
import './App.css';
import {useForm} from "react-hook-form";

function App() {
    const {handleSubmit, formState: {errors}, register} = useForm({mode: 'onChange'});

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
                    id="name-field"
                    {...register("firstName", {
                        required: true,
                        minlength: 2,
                        maxLength: 50
                    })}
                />
                {errors.firstname && <small>{errors.firstname.message}</small>}
                <label htmlFor="lastname-field">
                    Achternaam:
                </label>
                <input
                    type="text"
                    id="lastname-field"
                    {...register("lastName", {
                        required: true,
                        minlength: 2,
                        maxLength: 60
                    })}
                />
                {errors.lastname && <small>{errors.lastname.message}</small>}
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
                    <option value="iedere week">iedere week</option>
                    <option value="om de week">om de week</option>
                    <option value="iedere maand">iedere maand</option>
                    <option value="iedere maand">anders</option>
                </select>
                {errors.deliveryFrequency && <small>{errors.deliveryFrequency.message}</small>}
                <label htmlFor="custom-frequency-textarea">
                    Specificeer andere bezorgfrequentie:
                </label>
                <textarea
                    {...register("customDeliveryFrequency")}
                    rows="1"
                    cols="50"
                    maxLength="50"
                >
                        </textarea>
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
                        {...register("conditions")}
                    />
                    Akkoord met de algemene voorwaarden.
                </label>
                <button type="submit" id="send-form-button">
                    Verzenden
                </button>
            </form>
        </>
    );
}

export default App;
