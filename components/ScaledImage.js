import React from "react";
import { Image } from "react-native";

export default ScaledImage = (props) => {
    const [state, setState] = React.useState({ source: { uri: props.uri } });
    Image.getSize(props.uri, (width, height) => {
        if (props.width && !props.height) {
            setState({
                width: props.width,
                height: height * (props.width / width)
            });
        } else if (!props.width && props.height) {
            setState({
                width: width * (props.height / height),
                height: props.height
            });
        } else {
            setState({ width: width, height: height });
        }
    });


    return (
        <Image
            source={state.source}
            style={{ height: state.height, width: state.width }}
        />
    );
}


