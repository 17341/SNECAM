import React from 'react';
import { Formik } from 'formik';
import { Alert, ActivityIndicator, View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth'
import styles from '../styles'

const SignUpScreen = () => {

    const userModel = {
        firstName: '',
        lastName: '',
        friends: [],
        posts: [],
        email: '',
        username: ''
    }

    const postModel = {
        title: '',
        createdAt: '',
        updatedAt: '',
        content: {
            photo: '',
            text: ''
        },
        likedBy: [],
    }

    const { loading, handleSingUp } = useAuth();

    const handleSubmit = (values) => {
        Object.keys(values).forEach(key => {
            if (values[key].length === 0) {
                Alert.alert("Please complete all fields!");
            }
        })
    }


    return (
        !loading ?
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        username: "",
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="First Name"
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Last Name"
                                value={values.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Username"
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                style={styles.input}
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
export default SignUpScreen
