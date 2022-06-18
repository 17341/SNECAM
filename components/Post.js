import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles'
import { useNavigation } from '@react-navigation/core'
import { updatePost } from '../hooks/handleUpdate'
import { getImage } from '../hooks/handleFetch'
import useAuth from '../hooks/useAuth'

const Post = (data) => {
    let postData = data.data.data()
    let postId = data.data.id
    let postDate = postData.createdAt.toDate()

    const { user } = useAuth();
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = React.useState(undefined);

    React.useEffect(() => {
        if (postData.content.photo.length > 0) {
            getImage(postData.content.photo).then((url) => {
                setImageUrl(url)
            })
        }
    }, []);
    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text>{postData.createdBy}</Text>
                <Text>
                    {postDate.getDate()}
                    /{postDate.getMonth() + 1}
                    /{postDate.getFullYear()}</Text>
            </View>
            <View style={styles.line} />
            <View>
                <Text>{postData.content.text}</Text>
                {imageUrl ?
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ImageScreen', {
                            url: { uri: imageUrl }
                        })}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: imageUrl }}
                        />
                    </TouchableOpacity> : <Text></Text>
                }

            </View>
            <View style={styles.line} />
            <View style={styles.postHeader}>
                {postData.likes.includes(user.email) ?
                    <TouchableOpacity
                        onPress={() => updatePost(postId, {
                            likes: postData.likes.filter((l) =>
                                l !== user.email
                            )
                        })}
                        style={[styles.buttonOutline, styles.button, { backgroundColor: "red", borderColor: "red" }]}
                    >
                        <Text style={styles.buttonText}>{postData.likes.length}</Text>
                        <Text style={styles.buttonText}>Unlike</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        onPress={() => updatePost(postId, { likes: [...postData.likes, user.email] })}
                        style={[styles.buttonOutline, styles.button]}
                    >
                        <Text style={styles.buttonText}>{postData.likes.length}</Text>
                        <Text style={styles.buttonText}>Like</Text>
                    </TouchableOpacity>

                }

            </View>
        </View>
    )
}

export default Post