import { KeyboardAvoidingView, TextInput, View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import styles from '../styles'
import Posts from '../components/Posts'
import { useNavigation } from '@react-navigation/core'
import { getCollection } from '../hooks/handleFetch';

import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";

const HomeScreen = () => {
    const navigation = useNavigation();
    const { logOut, user } = useAuth();
    const [friends, setFriends] = React.useState([])
    const [userData, setUserData] = React.useState("")

    React.useEffect(() => {
        // getCollection("users").then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         if (doc.id === user.email) {
        //             setFriends(doc.data().friends)
        //             setUserData(doc)
        //         }
        //     });
        // });
        onSnapshot(collection(db, "users"), (snapshot) => {
            snapshot.forEach((doc) => {
                if (doc.id === user.email) {
                    setFriends(doc.data().friends)
                    setUserData(doc)
                }
            });
        })
    }, []);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.homeContainer, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}
        >
            <KeyboardAvoidingView style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UserProfile', {
                        user: userData, me: true
                    })}
                    style={[{ justifyContent: "center", alignItems: "center", backgroundColor: "gray", width: "20%", height: "100%" }]}
                >
                    <Text style={styles.buttonText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("SearchUser", {
                            friends: friends
                        })
                    }
                    style={[{ justifyContent: "center", alignItems: "center", width: "60%", height: "100%" }]}
                >
                    <Text >Search users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={logOut}
                    style={[{ justifyContent: "center", alignItems: "center", backgroundColor: "red", width: "20%", height: "100%" }]}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.homeBody}>
                <Posts users={friends} />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        backgroundColor: "green",
                        alignItems: 'center', width: "100%", height: "100%"
                    }}
                    onPress={() =>
                        navigation.navigate("AddPost")
                    }
                >
                    <Text style={[styles.buttonText]}>Add Post</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen