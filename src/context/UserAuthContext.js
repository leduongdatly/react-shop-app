import {
    createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState("");

    const signUp = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const deleteProductFirebase = (id) => {
        const productsDoc = doc(db, "products", id);
        return deleteDoc(productsDoc);
    }

    const deleteUserCartProductFirebase = (id) => {
        const cartDoc = doc(db, "cart", id);
        return deleteDoc(cartDoc);
    }

    const increaseQuantityFirebase = (id, qty) => {
        const cartDoc = doc(db, "cart", id);
        const newField = { quantity: qty };
        return updateDoc(cartDoc, newField);
    }

    const decreaseQuantityFirebase = (id, qty) => {
        const cartDoc = doc(db, "cart", id);
        const newField = { quantity: qty };
        return updateDoc(cartDoc, newField);
    }

    const addProductFirebase = (data) => {
        const productCollectionRef = collection(db, "products");
        return addDoc(productCollectionRef, data);
    }

    const updateProductFirebase = (data, id) => {
        const cartDoc = doc(db, "products", id);
        const newField = data;
        return updateDoc(cartDoc, newField);
    }

    const updateUserRoleFirebase = (id, role) => {
        const cartDoc = doc(db, "users", id);
        var r = role === "admin" ? "customer" : "admin";
        const newField = { role: r };
        return updateDoc(cartDoc, newField);
    }

    const addTypeFirebase = (data) => {
        const typeCollectionRef = collection(db, "type");
        return addDoc(typeCollectionRef, data);
    }

    const deleteTypeFirebase = (id) => {
        const typeDoc = doc(db, "type", id);
        return deleteDoc(typeDoc);
    }

    const updateTypeFirebase = (data, id) => {
        const typeDoc = doc(db, "type", id);
        const newField = data;
        return updateDoc(typeDoc, newField);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => {
            unsubscribe();
        }
    }, []);
    return <userAuthContext.Provider value={{ user, signUp, logOut, signIn, deleteProductFirebase, deleteUserCartProductFirebase, increaseQuantityFirebase, decreaseQuantityFirebase, addProductFirebase, updateProductFirebase, updateUserRoleFirebase, addTypeFirebase, deleteTypeFirebase, updateTypeFirebase }} >{children}</userAuthContext.Provider>
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}