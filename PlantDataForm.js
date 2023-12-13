import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
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
  const [userEmail, setUserEmail] = useState("");
  const [scannedData, setScannedData] = useState("");

  const route = useRoute();

  const healthLabels = ["Poor", "Fair", "Good"];
  const evidenceOptions = [
    "Predation",
    "Herbivory",
    "Flowering",
    "Seeding",
    "Drying Out",
  ];

 const mapScannedDataToSpecies = (scannedData) => {
  const mappingRules = {
    QUAG: "Coastal live oak",
    QULO: "Valley live oak",
    SANI: "Elderberry",
    JUCA: "Southern California black walnut",
    MALA: "Laurel sumac",
    HEAR: "Toyon",
    RHIN: "Lemonade berry",
    FRCA: "Coffeeberry",
    BAPI: "Coyote brush",
    RHIL: "Hollyleaf redberry",
    RIAU: "Golden currant",
    RISP: "Fuchsiaflower gooseberry",
  };

  // Extract the prefix from the scannedData
  const prefix = scannedData.substring(0, 4);

  // Use the mappingRules to get the corresponding species
  const species = mappingRules[prefix] || "";

  return species;
};

  useEffect(() => {
    navigation.setOptions({headerTitle: ' '});
    const { scannedData = "", email = "" } = route.params ?? {};
    if (scannedData) {
      setPlant(scannedData);
      setSpecies(mapScannedDataToSpecies(scannedData));
    }
    if (email) {
      setUserEmail(email);
    }
  }, [route.params]);




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
      setSpecies(mapScannedDataToSpecies(scannedData));
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
      setScannedData("")
    } catch (error) {
      console.error("", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Plant Data Form</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to QR Code Scanner"
          onPress={() => navigation.navigate('QRCodeScanner')}
          color="#FFFFFF"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPlant}
          value={plant}
          placeholder="Enter Plant ID if QR Code is unavailable"
          placeholderTextColor="#FFF" // White placeholder text
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setSpecies}
          value={species}
          placeholder="Enter Species ID if QR Code is unavailable"
          placeholderTextColor="#FFF" // White placeholder text
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Dead</Text>
        <Switch
          trackColor={{ false: "#D1D1D6", true: "#34C759" }}
          thumbColor="#FFFFFF"
          onValueChange={setIsDead}
          value={isDead}
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.switchLabel}>Plant Health: {plantHealth}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={2}
          step={1}
          minimumTrackTintColor="#34C759"
          maximumTrackTintColor="#C7C7CC"
          thumbTintColor="#34C759"
          value={healthLabels.indexOf(plantHealth)}
          onValueChange={(value) => setPlantHealth(healthLabels[value])}
        />
      </View>
      <View>
        <Text style={styles.switchLabel}>Evidence of:</Text>
        {evidenceOptions.map((option) => (
          <View key={option} style={styles.checkboxContainer}>
            <Checkbox
              value={evidenceOf.includes(option)}
              onValueChange={() => toggleEvidenceOption(option)}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>{option}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={addPlant}
          title="Add Plant"
          color="#FFFFFF"
          disabled={plant === ""}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#D2B48C', // Light brown background
    color: 'white', // White text
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#34C759',
    borderRadius: 10,
    marginBottom: 20,
  },
  labelContainer: {
    backgroundColor: '#D2B48C',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    color: 'white'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sliderContainer: {
    alignItems: 'stretch',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  checkbox: {
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default PlantDataForm;