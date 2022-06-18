import { View, Text, Alert, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../styles'
import { Formik } from 'formik';
import useAuth from '../hooks/useAuth'
import { addPost } from "../hooks/handleAdd"
import { useNavigation } from '@react-navigation/core'
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

import * as ImagePicker from 'expo-image-picker';

const AddPostForm = () => {

    const { user } = useAuth();
    const navigation = useNavigation();
    const [image, setImage] = React.useState(null);

    const handleSubmit = async (values) => {
        let ready = true;
        for (const key of Object.keys(values)) {
            if (values[key].length === 0) {
                Alert.alert("Please complete all fields!");
                ready = false;
                return true;
            }
        }
        if (ready) {
            let name = `${user.email}_image__${new Date}`
            if (image) {
                const storageRef = ref(storage, name);
                const img = await fetch(image.uri)
                const bytes = await img.blob()

                await uploadBytes(storageRef, bytes)
            }

            let post = {
                content: {
                    text: values.textContent,
                    photo: image ? name : ""
                },
                likes: [],
                createdAt: new Date,
                updatedAt: new Date,
                title: values.title,
                createdBy: user.email
            }
            addPost(post).then(() => {
                Alert.alert("Posted")
                navigation.goBack();
            });
        }
    }

    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result);
        }

    }
    // const handleCamera = async () => {
    //     let result = await ImagePicker.OpenCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         quality: 1,
    //     });

    //     if (!result.cancelled) {
    //         setImage(result);
    //     }
    // }
    return (
        <Formik
            initialValues={{
                title: "",
                textContent: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Title"
                        value={values.title}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        style={styles.input}
                        maxLength={16}
                    />
                    <TextInput
                        multiline={true}
                        placeholder="Content"
                        value={values.textContent}
                        onChangeText={handleChange('textContent')}
                        onBlur={handleBlur('textContent')}
                        style={[styles.input, { height: "40%" }]}
                    />
                    {image ?
                        <View style={[{
                            flex: 1,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: "row",
                        }]}>
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                }}
                                source={{ uri: image.uri }}
                            />
                            <TouchableOpacity
                                onPress={() => setImage(null)}
                                style={[styles.button, {
                                    backgroundColor: "red", width: "20%"
                                }]}
                            >
                                <Text style={styles.buttonText}>X</Text>
                            </TouchableOpacity>
                        </View> : <Text> No picture yet :( </Text>
                    }
                    {/* <View style={[{
                        flex: 1,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: "row",
                        width: "100%"
                    }]}> */}
                    <TouchableOpacity
                        onPress={handleChooseImage}
                        style={[styles.button, {
                            backgroundColor: "gray"
                        }]}
                    >
                        <Text style={styles.buttonText}>Add picture</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                            onPress={handleCamera}
                            style={[styles.button, { backgroundColor: "gray", width: "50%" }]}
                        >
                            <Text style={styles.buttonText}>Camera</Text>
                        </TouchableOpacity>
                    </View> */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add Post</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}

export default AddPostForm