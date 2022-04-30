import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles'
import { useNavigation } from '@react-navigation/core'

const Post = (data) => {
    let postData = data.data
    const navigation = useNavigation();

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Text>{postData.uploadedBy}</Text>
                <Text>{postData.createdAt}</Text>
            </View>
            <View style={styles.line} />
            <View>
                <Text>L'obtention du permis d'études (150 $ + 85$ pour les données biométriques) délivré par Immigration, Réfugiés et Citoyenneté Canada (IRCC) constitue la 2e étape du processus d’immigration pour venir étudier au Québec. Pour déposer votre demande de permis d'études, vous devez avoir obtenu le CAQ ou l’avis électronique de délivrance du CAQ, sauf exemption. Le délai de traitement des demandes de permis d'études est variable. Une demande de permis d'études faite à l'extérieur du Canada inclut automatiquement le visa ou l'autorisation de voyage électronique (AVE) et ce, sans frais supplémentaires. </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ImageScreen', {
                        url: require('../images/test.png')
                    })}
                >
                    <Image
                        style={styles.image}
                        source={require('../images/test.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <View style={styles.postHeader}>
                <TouchableOpacity
                    style={[styles.buttonOutline, styles.button]}
                >
                    <Text style={styles.buttonText}>7</Text>
                    <Text style={styles.buttonText}>Likes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Post