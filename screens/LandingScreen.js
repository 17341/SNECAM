import React from 'react'
import LoginForm from '../components/LoginForm'
import { KeyboardAvoidingView } from 'react-native';

const LandingScreen = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <LoginForm />
        </KeyboardAvoidingView>
    )
}

export default LandingScreen