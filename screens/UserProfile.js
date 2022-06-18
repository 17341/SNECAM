import { View, Text, StatusBar, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles'
import Posts from '../components/Posts'
import useAuth from '../hooks/useAuth'
import { updateUser } from '../hooks/handleUpdate'

const UserProfileScreen = (props) => {
    const { user } = useAuth();
    let userData = props.route.params.user.data()
    let userEmail = props.route.params.user.id
    const [followed, setFollowed] = React.useState(props.route.params.followed)
    const [friends, setFriends] = React.useState(props.route.params.friends)

    let me = props.route.params.me

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.homeContainer, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}
        >
            <KeyboardAvoidingView style={[styles.header, { padding: 10 }]} >
                <Text >Last Name : {userData.lastName}</Text>
                <Text >First Name : {userData.firstName}</Text>
                <Text >Username : {userData.username}</Text>
            </KeyboardAvoidingView>
            <Text>Posts</Text>
            <View style={styles.homeBody}>
                <Posts users={[userEmail]} />
            </View>
            {!me ? followed ?
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            backgroundColor: "red",
                            alignItems: 'center', width: "100%", height: "100%"
                        }}
                        onPress={() => {
                            updateUser(user.email, { friends: friends.filter((friend) => friend !== userEmail) })
                            setFollowed(false)
                            setFriends(friends.filter((friend) => friend !== userEmail))
                        }

                        }
                    >
                        <Text style={[styles.buttonText]}>Unfollow</Text>
                    </TouchableOpacity>
                </View>
                : <View style={styles.footer}>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            backgroundColor: "green",
                            alignItems: 'center', width: "100%", height: "100%"
                        }}
                        onPress={() => {
                            updateUser(user.email, { friends: [...friends, userEmail] })
                            setFollowed(true)
                            setFriends([...friends, userEmail])
                        }
                        }
                    >
                        <Text style={[styles.buttonText]}>Follow</Text>
                    </TouchableOpacity>
                </View> : <Text></Text>}

        </KeyboardAvoidingView>
    )
}

export default UserProfileScreen