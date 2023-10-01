import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('./images/background.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Ascot App</Text>
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
                <Button title="Signup" onPress={() => navigation.navigate('SignUp')} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // or 'stretch'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomeScreen;