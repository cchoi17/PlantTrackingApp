import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIRESTORE_DB } from "./firebaseConfig";
import { useRoute } from "@react-navigation/native";

const IntroScreen = ({ navigation }) => {
    const [plant, setPlant] = useState("");
    const [species, setSpecies] = useState("");
    const [userEmail, setUserEmail] = useState("Email not found");
    const [scannedData, setScannedData] = useState("Waiting on scan...");

    const route = useRoute();

    useEffect(() => {
        const { scannedData = "Waiting on scan...", email = "" } = route.params ?? {};
        setScannedData(scannedData || "Waiting on scan...");
        setUserEmail(email || "email not found");
    }
    , [route]);

    const addPlant = async () => {
      try {
        setPlant(scannedData)
        const docRef = await addDoc(collection(FIRESTORE_DB, "plantsData"), {
          plantID: scannedData,
          speciesID: species,
          email: userEmail.toLowerCase(),
          timestamp: serverTimestamp(),
        });
        console.log("Added plant with ID: ", docRef.id);
        setPlant("");
        setSpecies("");
        setScannedData("Waiting on scan...")
      } catch (error) {
        console.error("Error adding plant: ", error);
      }
    };

    return (
    <View style={styles.container}>
      <View>
        <Button
          title="Go to QR Code Scanner"
          onPress={() => navigation.navigate('QRCodeScanner', { email: userEmail})}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitles}>Plant ID:</Text>
        <Text style={styles.formTitles}>{scannedData}</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitles}>Species</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Species ID, if QR code is unavailable"
          onChangeText={(text) => setSpecies(text)}
          value={species}
        />
      </View>
      <Button onPress={addPlant} title="Add Plant" disabled={scannedData === "Waiting on scan..."} />
    </View>
    );
};
export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  formTitles: {
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2F5233",
    backgroundColor: "#e6ffe6",
    height: 40,
    borderRadius: 4,
    flex: 1,
    padding: 10,
  }
})