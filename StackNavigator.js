import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "./screens/RegisterScreen";
import LandingScreen from "./screens/LandingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import useAuth from "./hooks/useAuth";
import LoadingScreen from "./screens/LoadingScreen";
import ImageScreen from "./screens/ImageScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user, registered, loading } = useAuth();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
            initialRouteName="Loading"
        >
            {loading ? <Stack.Screen name="Loading" component={LoadingScreen} />
                : user ? (
                    registered ? <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="ImageScreen" component={ImageScreen} />
                    </>
                        : <Stack.Screen name="Register" component={RegisterScreen} />
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LandingScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>
                )
            }
        </Stack.Navigator>
    );
};

export default StackNavigator;