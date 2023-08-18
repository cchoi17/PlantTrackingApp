import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import firebaseConfig from './firebaseConfig';
import Navigator from './Navigation';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
    return (
        <View style={styles.container}>
            <Navigator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
