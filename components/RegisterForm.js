import React from 'react'
import { Formik } from 'formik';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles'
import useAuth from '../hooks/useAuth'
import { addUser } from "../hooks/handleAdd"

const RegisterForm = () => {
    const { user, setRegistered } = useAuth();

    const handleSubmit = (values) => {
        let ready = true;
        for (const key of Object.keys(values)) {
            if (values[key].length === 0) {
                Alert.alert("Please complete all fields!");
                ready = false;
                return true;
            }
        }
        if (ready) {
            values.friends = [];
            values.posts = [];
            addUser(values).then(() => {
                setRegistered(true);
            });
        }
    }
    return (
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
                        maxLength={16}
                    />
                    <TextInput
                        placeholder="Last Name"
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        style={styles.input}
                        maxLength={16}
                    />
                    <TextInput
                        placeholder="Username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        style={styles.input}
                        maxLength={16}
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
};
export default RegisterForm