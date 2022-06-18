import React from 'react';
import { KeyboardAvoidingView, Platform, Modal } from 'react-native';
import styles from '../styles'
import AddPostForm from '../components/AddPostForm'

const AddPostScreen = () => {

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <AddPostForm />
        </KeyboardAvoidingView>

    )
}

export default AddPostScreen
