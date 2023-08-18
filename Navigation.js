import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QRScanner from './QRScanner';
import PlantDataInput from './PlantDataInput';
import LoginScreen from './LoginScreen'; 
import SignUpScreen from './SignUpScreen'; 
import { AuthContext } from './AuthContext'; 

const Stack = createStackNavigator();

function Navigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Scanner" : "Login"}>
        {user ? (
          <>
            <Stack.Screen name="Scanner" component={QRScanner} />
            <Stack.Screen name="Input" component={PlantDataInput} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
