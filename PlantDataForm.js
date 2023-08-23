import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native'
import React, { useEffect, useState} from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { FIRESTORE_DB } from './firebaseConfig'
import { useRoute } from '@react-navigation/native';

const PlantDataForm = ({navigation}) => {
  const [plants, setPlants] = useState([])
  const [plant, setPlant] = useState('')
  const [isDead, setIsDead] = useState(false);

  const route = useRoute();

  useEffect(() => {
    // Access the email parameter from the route params
    const { email } = route.params || {};
  }, [route]);

  const addPlant = async () => {
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, 'plantsData'), {
        plantID: plant,
        dead: isDead, 
        description: 'Example test description',
        email: route.params.email.toLowerCase(),
        timestamp: serverTimestamp(),
      });
      console.log('Added plant with ID: ', docRef.id);
      setPlant('');
      setIsDead(false); // Reset the plant status
    } catch (error) {
      console.error('Error adding plant: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formTitles} >Plant ID</Text>
        <TextInput style={styles.input} placeholder = "Instead of QR code, enter plant ID"
        onChangeText={(text) => setPlant(text)}
        value={plant}/>
      </View>
      <View style={styles.form}>
      <Text style={styles.formTitles}>Dead</Text>
      <Switch
          trackColor={{ false: '#767577', true: '#00cc44' }}
          thumbColor={isDead ? '#ccffdd' : '#f4f3f4'}
          onValueChange={(value) => setIsDead(value)}
          value={isDead}
      />
      </View>
      <Button onPress={addPlant} title="Add Plant" disabled={plant ===''} />
    </View>
  )
}

export default PlantDataForm

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
  },

  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },

  formTitles: {
    marginRight: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#2F5233',
    backgroundColor: '#e6ffe6',
    height: 40,
    borderRadius: 4,
    flex: 1,
    padding: 10,
  },

})