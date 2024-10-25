// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandscapingDetailsScreen from './screens/LandscapingDetailsScreen';
import FirstAidDetailsScreen from './screens/FirstAidDetailsScreen';
import SewingDetailsScreen from './screens/SewingDetailsScreen';
import LifeSkillsDetailsScreen from './screens/LifeSkillsDetailsScreen';
import ChildMindingDetailsScreen from './screens/ChildMindingDetailsScreen';
import CookingDetailsScreen from './screens/CookingDetailsScreen';
import GardenMaintenanceDetailsScreen from './screens/GardenMaintenanceDetailsScreen';
import LongCoursesScreen from './screens/LongCoursesScreen';
import ShortCoursesScreen from './screens/ShortCoursesScreen';
import QuoteScreen from './screens/QuoteScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import WelcomeScreen from  './screens/WelcomeScreen';
import HomeScreen from  './screens/HomeScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="FirstAid" component={FirstAidDetailsScreen} />
        <Stack.Screen name="Sewing" component={SewingDetailsScreen} />
        <Stack.Screen name="Landscaping" component={LandscapingDetailsScreen} />
        <Stack.Screen name="LifeSkills" component={LifeSkillsDetailsScreen} />
        <Stack.Screen name="ChildMinding" component={ChildMindingDetailsScreen} />
        <Stack.Screen name="Cooking" component={CookingDetailsScreen} />
        <Stack.Screen name="GardenMaintenance" component={GardenMaintenanceDetailsScreen} />
        <Stack.Screen name="LongCourses" component={LongCoursesScreen} />
        <Stack.Screen name="ShortCourses" component={ShortCoursesScreen} />
        <Stack.Screen name="Quote" component={QuoteScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}