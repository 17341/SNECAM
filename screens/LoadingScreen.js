import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

export default LoadingScreen
