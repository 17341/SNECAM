import React from 'react'
import { ActivityIndicator, View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core'

const LoginScreen = () => {
    const navigation = useNavigation();
    const { signInWithGoogle, handleLogin, loading } = useAuth();
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    return (
        !loading ?
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity
                    onPress={() => handleLogin(email, password)}
                    style={[styles.button, { width: '80%' }]}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={signInWithGoogle}
                        style={[styles.button, { backgroundColor: "green" }]}
                    >
                        <Text style={styles.buttonText}>Login with Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Register")
                        }
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register with email</Text>
                    </TouchableOpacity>
                </View>
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

export default LoginScreen