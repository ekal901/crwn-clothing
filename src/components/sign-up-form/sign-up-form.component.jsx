import React, { useContext, useState } from 'react'
import UserContext from '../../contexts/user.context';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'

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
    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
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

            <Button buttonType='inverted' type="submit">Sign up</Button>
        </form>
    </div>
  )
}
export default SignUpForm;