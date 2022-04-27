import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'

const HomeScreen = () => {
    const navigation = useNavigation();
    const { logOut } = useAuth();

    return (
        <View>
            <Text>Home screen</Text>
            <Button title="Logout" onPress={() => logOut()} />
        </View>
    )
};
//<Button title="Go to login" onPress={() => navigation.navigate("Login")} />
export default HomeScreen