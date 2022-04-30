import { View, ImageBackground, Dimensions, StatusBar } from 'react-native'
import React from 'react'

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

const ImageScreen = (props) => {

    return (
        <View
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}
        >
            <ImageBackground
                source={props.route.params.url}
                style={{
                    width: null,
                    resizeMode: 'contain',
                    height: 250,
                }}
                resizeMode="contain"
            />
        </View>
    )
}

export default ImageScreen