import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("passwords do not match");
            return false;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({
            ...formFields,
            [name] : value
        })
    }
  return (
    <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Display Name" 
                inputOptions= {{
                    type: "text",
                    name: "displayName", 
                    required: true,
                    onChange: handleChange,
                    value: displayName
                }}
            />

            <FormInput 
                label="Email"
                inputOptions= {{
                    type: "email",
                    name: "email", 
                    required: true,
                    onChange: handleChange,
                    value: email
                }}
            />

            <FormInput 
                label="Password"
                inputOptions= {{
                    type: "password",
                    name: "password", 
                    required: true,
                    onChange: handleChange,
                    value: password
                }}
            />

            <FormInput 
                label="Confirm Password"
                inputOptions= {{
                    type: "password",
                    name: "confirmPassword", 
                    required: true,
                    onChange: handleChange,
                    value: confirmPassword
                }}
            />

            <button type="submit">Sign up</button>
        </form>
    </div>
  )
}
export default SignUpForm;