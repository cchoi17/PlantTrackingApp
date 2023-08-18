import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PlantDataForm from './PlantDataForm';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PlantDataForm" component={PlantDataForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}