import React from 'react'
import useAuth from '../hooks/useAuth'
import { KeyboardAvoidingView, Text, Platform, TouchableOpacity } from 'react-native';
import styles from '../styles'
import RegisterForm from '../components/RegisterForm'

const RegisterScreen = () => {
    const { cancel } = useAuth();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <RegisterForm />
            <TouchableOpacity
                onPress={cancel}
                style={[styles.button, { backgroundColor: "red", width: "80%" }]}
            >
                <Text style={styles.buttonText}>Cancel Registration</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
};

export default RegisterScreen