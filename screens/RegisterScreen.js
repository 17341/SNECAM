import React from 'react';
import { Formik } from 'formik';
import { Alert, ActivityIndicator, View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core'

const RegisterScreen = () => {
    const { loading, handleSignUp } = useAuth();
    const navigation = useNavigation();

    const handleSubmit = (values) => {
        let ready = true;
        for (const key of Object.keys(values)) {
            if (values[key].length === 0) {
                Alert.alert("Please complete all fields!");
                ready = false;
                return true;
            }
        }
        if (values.password1 !== values.password2) {
            Alert.alert("Passwords does not match!");
            ready = false;
        }
        if (ready) {
            handleSignUp(values.email, values.password1);
            navigation.goBack();
        }
    }


    return (
        !loading ?
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Formik
                    initialValues={{
                        email: "",
                        password1: "",
                        password2: ""
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Password"
                                value={values.password1}
                                onChangeText={handleChange('password1')}
                                onBlur={handleBlur('password1')}
                                style={styles.input}
                                secureTextEntry
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                value={values.password2}
                                onChangeText={handleChange('password2')}
                                onBlur={handleBlur('password2')}
                                style={styles.input}
                                secureTextEntry
                            />
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.button}
                            >
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
            : <ActivityIndicator size="large" />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})
export default RegisterScreen
