import { useState, useEffect, createContext, useContext } from 'react';
import { auth, db } from '@/lib/firebase';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkAdminStatus = async (uid) => {
        try {
            const docRef = doc(db, 'user_roles', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                // Strictly check for 'admin' role
                return data.role === 'admin';
            }
            return false;
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const adminStatus = await checkAdminStatus(currentUser.uid);
                setIsAdmin(adminStatus);
            } else {
                setIsAdmin(false);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { error: null };
        } catch (error) {
            return { error };
        }
    };

    const signUp = async (email, password, fullName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (fullName) {
                await updateProfile(userCredential.user, {
                    displayName: fullName
                });
            }
            return { error: null };
        } catch (error) {
            return { error };
        }
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
