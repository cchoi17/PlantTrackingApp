import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

function PlantDataInput({ navigation, route }) {
  const { qrData } = route.params; //QR data passed through nav
  const [plantName, setPlantName] = useState(''); 
  const db = firebase.firestore();
  const userID = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;  // fetch id of current logged user

  const handleSave = () => {
    if (!userID) {
      alert("User not authenticated.");
      return;
    }

    db.collection("users").doc(userID).collection("plants").add({
      plantName: plantName,
      qrData: qrData,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // TODO: imageURL upload?
    })
    .then(() => {
      alert("Data saved successfully!");
      navigation.goBack(); // can also navigate to another screen
    })
    .catch(error => {
      alert(`Error saving data: ${error.message}`);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        placeholder="Enter Plant Name"
        value={plantName}
        onChangeText={text => setPlantName(text)}
      />
      <Button title="Save Plant Data" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  }
});

export default PlantDataInput;
