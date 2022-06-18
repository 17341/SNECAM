import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    image: {
        width: null,
        resizeMode: 'contain',
        height: 250
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    homeBody: {
        backgroundColor: "#D3D3D3",
        flex: 15,
        width: "100%",
    },
    line: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    postHeader: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row"
    },
    userSearch: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: "row",
        backgroundColor: "white",
        width: "80%"
    },
    postContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#FFFFFF",
        width: "100%",
        margin: 2,
        padding: 10
    },
    header: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
        width: "100%"
    },
    footer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: "row",
        width: "100%"
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
    search: {
        backgroundColor: 'white',
        height: 40,
        width: "90%",
        margin: 12,
        borderRadius: 10,
        padding: 10,
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