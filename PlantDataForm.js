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
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";

const PlantDataForm = ({ navigation }) => {
  const [plant, setPlant] = useState("");
  const [species, setSpecies] = useState("");
  const [isDead, setIsDead] = useState(false);
  const [plantHealth, setPlantHealth] = useState("Fair");
  const [evidenceOf, setEvidenceOf] = useState([]);
  const [userEmail, setUserEmail] = useState("Email not found");
  const [scannedData, setScannedData] = useState("Waiting on scan...");

  const route = useRoute();

  const healthLabels = ["Poor", "Fair", "Good"];
  const evidenceOptions = [
    "Predation",
    "Herbivory",
    "Flowering",
    "Seeding",
    "Drying Out",
  ];

    useEffect(() => {
        const { scannedData = "Waiting on scan...", email = "" } = route.params ?? {};
        setScannedData(scannedData || "Waiting on scan...");
        setUserEmail(email || "email not found");
    }
    , [route]);



  const toggleEvidenceOption = (option) => {
    if (evidenceOf.includes(option)) {
      setEvidenceOf(evidenceOf.filter((value) => value !== option));
    } else {
      setEvidenceOf([...evidenceOf, option]);
    }
  };

  const addPlant = async () => {
    try {
      setPlant(scannedData)
      const docRef = await addDoc(collection(FIRESTORE_DB, "plantsData"), {
        plantID: scannedData,
        speciesID: species,
        dead: isDead,
        plantHealth: plantHealth,
        evidenceOf: evidenceOf,
        email: userEmail.toLowerCase(),
        timestamp: serverTimestamp(),
      });
      console.log("Added plant with ID: ", docRef.id);
      setPlant("");
      setSpecies("");
      setIsDead(false);
      setEvidenceOf([]);
      setPlantHealth("Fair"); // Reset all the plant status variables
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
      <View style={styles.form}>
        <Text style={styles.formTitles}>Dead</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#00cc44" }}
          thumbColor={isDead ? "#ccffdd" : "#f4f3f4"}
          onValueChange={(value) => setIsDead(value)}
          value={isDead}
        />
      </View>
      <View>
        <Text style={styles.formTitles}>Plant Health: {plantHealth}</Text>
        <View style={{ alignItems: "center" }}>
          <Slider
            style={{ width: 300, height: 50 }}
            minimumValue={0}
            maximumValue={2}
            step={1}
            minimumTrackTintColor="#00cc44"
            maximumTrackTintColor="#006622"
            thumbTintColor="#00cc44"
            value={healthLabels.indexOf(plantHealth)}
            onValueChange={(value) => setPlantHealth(healthLabels[value])}
          />
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitles}>Evidence of:</Text>
        <View style={styles.checkboxContainer}>
          {evidenceOptions.map((option) => (
            <View key={option} style={styles.checkboxRow}>
              <View style={styles.textContainer}>
                <Text>{option}</Text>
              </View>
              <Checkbox
                value={evidenceOf.includes(option)}
                onValueChange={() => toggleEvidenceOption(option)}
              />
            </View>
          ))}
        </View>
      </View>

      <Button onPress={addPlant} title="Add Plant" disabled={scannedData === "Waiting on scan..."} />
    </View>
  );
};

export default PlantDataForm;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },

  checkboxContainer: {
    flexDirection: "column",
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  textContainer: {
    paddingRight: 40,
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
  },
});
