import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();   
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect credentials');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                default:
                    console.log(error);        
            }
        }
    };
    
    const handleChange = e => {
        const { name, value } = e.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="text" onChange={handleChange} name="email" value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name="password" value={password} required />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;