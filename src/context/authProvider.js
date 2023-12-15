import React, {createContext, useMemo, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {auth} from '../firebase';
import {chatkitty} from '../chatkitty';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const value = useMemo(() => ({
        user,
        setUser,
        loading,
        setLoading,
        login: async (email, password) => {
            setLoading(true);

            try {
                const userCredential = await signInWithEmailAndPassword(auth,
                    email, password);

                // Signed-in Firebase user
                const currentUser = userCredential.user;

                const result = await chatkitty.startSession({
                    username: currentUser.uid,
                    authParams: {
                        idToken: await currentUser.getIdToken()
                    }
                });

                if (result.failed) {
                    console.log('could not login');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        register: async (displayName, email, password) => {
            setLoading(true);

            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth, email, password);

                await updateProfile(auth.currentUser, {
                    displayName: displayName
                });

                // Signed-in Firebase user
                const currentUser = userCredential.user;

                const startSessionResult = await chatkitty.startSession({
                    username: currentUser.uid,
                    authParams: {
                        idToken: await currentUser.getIdToken()
                    }
                });

                if (startSessionResult.failed) {
                    console.log('Could not sign up');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        },
        logout: async () => {
            try {
                await chatkitty.endSession();
            } catch (error) {
                console.error(error);
            }
        }
    }), [user, setUser, loading, setLoading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
