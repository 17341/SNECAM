import React from 'react'
import { View, Text, Button } from 'react-native'
import useAuth from '../hooks/useAuth'

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();

    return (
        <View>
            <Text> {loading ? "loading ... " : "Log in to the app"}</Text>
            <Button title="Login" onPress={signInWithGoogle} />
        </View>
    )
}

export default LoginScreen