import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); 

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            navigation.navigate('HomeScreen');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    }

    return (
        <ImageBackground source={require('./images/background.png')} style={styles.backgroundImage}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                    <Icon name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing = {handleSignUp}
                    returnKeyType = 'done'
                />
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    header: {
        marginTop: 50, // Adjust as needed
        marginLeft: 10, // Adjust as needed
        position: 'absolute',
        top: 0,
        left: 0,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default SignUpScreen;
