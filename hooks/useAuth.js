import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { IOS_CLIEND_ID, ANDROID_CLIEND_ID } from '@env'

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
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                }
                else {
                    setUser(null);
                }
                setLoadingInitial(false);
            })
        ,
        []);

    const signInWithGoogle = async () => {
        setLoading(true);
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === "success") {
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);

                await signInWithCredential(auth, credential);
            }
            return Promise.reject();
        }).catch((e) => serError(e)).finally(() => setLoading(false));
    };

    const logOut = () => {
        setLoading(true);
        signOut(auth).catch((e) => serError(e)).finally(() => setLoading(false));
    };

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        logOut,
        signInWithGoogle,
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}