import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
            <label htmlFor="">Display Name</label>
            <input 
                type="text" 
                name="displayName" 
                required
                onChange={handleChange}
                value={displayName}    
            />

            <label htmlFor="">Email</label>
            <input 
                type="email" 
                name="email" 
                required 
                onChange={handleChange}
                value={email}  
            />

            <label htmlFor="">Password</label>
            <input 
                type="password" 
                name="password" 
                required 
                onChange={handleChange}
                value={password}
            />

            <label htmlFor="">Confirm Password</label>
            <input 
                type="password" 
                name="confirmPassword" 
                required 
                onChange={handleChange}
                value={confirmPassword}
            />

            <button type="submit">Sign up</button>
        </form>
    </div>
  )
}
export default SignUpForm;