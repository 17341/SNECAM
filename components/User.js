import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const User = (user) => {
    return (
        <TouchableOpacity
            style={[{ backgroundColor: "white", width: "80%" }]}
        >
            <Text style={[styles.buttonText, { color: "black" }]}>{user.username}</Text>
        </TouchableOpacity>
    )
}

export default User;
