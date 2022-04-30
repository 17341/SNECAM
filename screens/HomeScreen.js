import { KeyboardAvoidingView, TextInput, View, SafeAreaView, Text, TouchableOpacity, Platform, StatusBar } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth'
import styles from '../styles'
import { getCollection } from '../hooks/handleFetch'
import Posts from '../components/Posts'
import { SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const { logOut, user } = useAuth();
    const [search, setSearch] = React.useState(null);

    // getCollection("users").then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id, "=> ", doc.data());
    //     });
    // });

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.homeContainer, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}
        >
            <KeyboardAvoidingView style={styles.header}>
                <TouchableOpacity
                    style={[{ justifyContent: "center", alignItems: "center", backgroundColor: "gray", width: "20%", height: "100%" }]}
                >
                    <Text style={styles.buttonText}>Account</Text>
                </TouchableOpacity>
                <View style={[{ width: "50%", height: "100%" }]}>
                    <TextInput
                        placeholder="Search users"
                        value={search}
                        onChangeText={text => setSearch(text)}
                        style={{ backgroundColor: 'white', height: "100%" }}
                    />
                </View>
                <TouchableOpacity
                    onPress={logOut}
                    style={[{ justifyContent: "center", alignItems: "center", backgroundColor: "red", width: "20%", height: "100%" }]}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={styles.homeBody}>
                <Posts />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        backgroundColor: "green",
                        alignItems: 'center', width: "100%", height: "100%"
                    }}
                >
                    <Text style={[styles.buttonText]}>Add Post</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen