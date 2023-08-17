import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QRScanner from './QRScanner';
import PlantDataInput from './PlantDataInput';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Scanner" component={QRScanner} />
        <Stack.Screen name="Input" component={PlantDataInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
