import React from 'react';
import { View, StyleSheet } from "react-native";
import { initializeApp } from '@react-native-firebase/app';
import firebaseConfig from './firebaseConfig';
import Navigator from './Navigation';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthProvider } from './AuthContext'; 

//init firebase
initializeApp(firebaseConfig);

export default function App() {
  return (
    <AuthProvider>  {}
      <View style={styles.container}>
        <Navigator />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
