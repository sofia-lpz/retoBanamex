// src/navigation/AppStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AddCita from '../screens/requestCard';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="requestCard"
        component={AddCita}
        options={{ title: 'Pedir tarjeta' }}
      />
    </Stack.Navigator>
    
  );
}
