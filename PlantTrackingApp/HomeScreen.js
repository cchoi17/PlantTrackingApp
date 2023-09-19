import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>iNaturalist</Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Signup" onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5dc762'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomeScreen;
