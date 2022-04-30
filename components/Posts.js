import { ScrollView, Text } from 'react-native'
import React from 'react'
import Post from './Post'

const Posts = () => {
    let posts = [{
        title: 'ad',
        createdAt: '30/04/2022',
        updatedAt: '2',
        content: {
            photo: '',
            text: 'EAEAEA'
        },
        likedBy: [],
        uploadedBy: "ranim@ecam.be"
    }, {
        title: 'é',
        createdAt: '30/04/2022',
        updatedAt: '3',
        content: {
            photo: '',
            text: 'DADAFA'
        },
        likedBy: [],
        uploadedBy: "17341@ecam.be"
    }];

    return (
        <ScrollView>
            {posts.map((post) =>
                <Post data={post} />)
            }
        </ScrollView>
    )
}

export default Posts