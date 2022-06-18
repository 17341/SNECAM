import { RefreshControl, ScrollView, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Post from './Post'
import { getCollection } from '../hooks/handleFetch'
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebase";
import useAuth from '../hooks/useAuth'


const Posts = (users) => {
    const { user } = useAuth();
    const [posts, setPosts] = React.useState([]);
    const [refresh, setRefresh] = React.useState(true);
    React.useEffect(() => {

        onSnapshot(collection(db, "posts"), (snapshot) => {
            setPosts(snapshot.docs.filter((doc) => users.users.includes(doc.data().createdBy)).reverse())
        }

        )
        setRefresh(false)
        // getCollection("posts").then((querySnapshot) => {
        //     let data = []
        //     querySnapshot.forEach((doc) => {
        //         if (users.users.includes(doc.data().createdBy)) {
        //             data.push(doc)
        //         }
        //     });
        //     setPosts(data);
        // });

    }, [refresh]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        wait(2000).then(() => setRefresh(false));
    }, []);

    return (

        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
            />
        }>
            {posts.length > 0 ? posts.map((post) =>
                <Post data={post} />) :
                <Text>No posts :( </Text>
            }
        </ScrollView>
    )
}

export default Posts