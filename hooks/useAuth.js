import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "@firebase/auth";
import { auth, db } from "../firebase";
import { IOS_CLIEND_ID, ANDROID_CLIEND_ID } from '@env'
import { Alert } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

const AuthContext = createContext({});

const config = {
    iosClientId: IOS_CLIEND_ID,
    androidClientId: ANDROID_CLIEND_ID,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
    const [error, serError] = useState(null);
    const [user, setUser] = useState(null);
    const [registered, setRegistered] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                    verifyRegistration(user);
                }
                else {
                    setUser(null);
                }
                setLoadingInitial(false);
            })
        ,
        []);

    const handleSignUp = async (email, password) => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async userCredentials => {
                const user = userCredentials.user;
            })
            .catch((e) => Alert.alert(e.message)).finally(() => setLoading(false));
    }

    const handleLogin = async (email, password) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(async userCredentials => {
                const user = userCredentials.user;
            })
            .catch((e) => Alert.alert(e.message)).finally(() => setLoading(false));
    }

    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === "success") {
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential)
            }
            return Promise.reject();
        }).catch((e) => serError(e)).finally(() => setLoading(false));
    };

    const logOut = () => {
        setLoading(true);
        signOut(auth).catch((e) => serError(e)).finally(() => setLoading(false));
    };

    const cancel = async () => {
        logOut();
        deleteUser(user).then(() => {
            Alert.alert("Registration cancelled");
        }).catch((error) => {
            Alert.alert(error);
        });
    }

    const verifyRegistration = async (user) => {
        setLoading(true);
        const docRef = doc(db, "users", user.email);
        await getDoc(docRef).then(async (doc) => {
            if (doc.exists()) {
                setRegistered(true);
            } else {
                setRegistered(false);
            }
        }).catch((e) => serError(e)).finally(() => setLoading(false));
    };

    const memoedValue = useMemo(() => ({
        user,
        registered,
        loading,
        error,
        logOut,
        signInWithGoogle,
        handleSignUp,
        handleLogin,
        setRegistered,
        cancel
    }), [user, registered, loading, error]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}