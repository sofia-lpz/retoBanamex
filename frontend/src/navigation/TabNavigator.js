import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ProfileScreen from '../screens/ProfileScreen'; // si tienes pantalla de perfil
import { useAuth } from '../api/authContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Tab.Navigator >
    </Tab.Navigator>
  );
}
