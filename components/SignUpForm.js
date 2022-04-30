import React from 'react';
import { Formik } from 'formik';
import { Alert, View, TextInput, Text, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth'
import styles from '../styles'

const SignUpForm = () => {
    const { handleSignUp } = useAuth();

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
        }
    }


    return (
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
    )
}

export default SignUpForm
