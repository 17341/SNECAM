import React from 'react'
import { KeyboardAvoidingView, StatusBar, Text, Platform, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import styles from '../styles'
import { getCollection } from '../hooks/handleFetch';
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'

import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
const SearchUserScreen = (props) => {
    const [text, onChangeText] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const navigation = useNavigation();
    const { user } = useAuth();
    let friends = props.route.params.friends

    React.useEffect(() => {
        // getCollection("users").then((querySnapshot) => {
        //     let data = []
        //     querySnapshot.forEach((doc) => {
        //         if (doc.data().username.toLowerCase().includes(text) && doc.id !== user.email) {
        //             data.push(doc)
        //         }
        //     });
        //     setUsers(data);
        // });
        onSnapshot(collection(db, "users"), (snapshot) =>
            setUsers(snapshot.docs.filter((doc) => doc.data().username.toLowerCase().includes(text) && doc.id !== user.email))
        )
    }, [text]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}
        >
            <TextInput
                style={styles.search}
                onChangeText={onChangeText}
                value={text}
            />
            {users.map((user) =>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UserProfile', {
                        user: user, followed: friends.includes(user.id) ? true : false, friends: friends
                    })}
                    style={[styles.user, { padding: 20, alignItems: "center", backgroundColor: "white", width: "100%" }]}
                >
                    <Text style={[styles.buttonText, { color: "black" }]}>{user.data().username}</Text>
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    )
};

export default SearchUserScreen