import React from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core'
import styles from '../styles'

const LoginForm = () => {
    const navigation = useNavigation();
    const { signInWithGoogle, handleLogin } = useAuth();
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    return (
        <>
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
                        navigation.navigate("SignUp")
                    }
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Sign up with email</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

export default LoginForm