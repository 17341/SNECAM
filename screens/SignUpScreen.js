import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../styles'
import SignUpForm from '../components/SignUpForm'

const SignUpScreen = () => {

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <SignUpForm />
        </KeyboardAvoidingView>
    )
}

export default SignUpScreen
