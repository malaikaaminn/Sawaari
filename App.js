import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import NearbyDrivers from './components/screens/NearbyDrivers'
import HireDriver from './components/screens/HireDriver'
import DriverInfo from './components/screens/DriverInfo'
import DriverLogin from './components/screens/DriverLogin'
import DriverSignup from './components/screens/DriverSignup';
import DriverLocation from './components/screens/DriverLocation';
import  { auth } from  './config/firebase';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);

  const Stack = createNativeStackNavigator();


  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(loggedIn);
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);



  return (
    <NavigationContainer>
  <Stack.Navigator
    // initialRouteName={loggedIn ? 'Nearby Drivers'|| 'Driver Info' || 'Hire Driver' : 'Driver Login'}
    // screenOptions={{
    //   headerTitleAlign: 'center',
    //   headerTitleStyle: { fontSize: 16, fontFamily: 'Roboto-Bold' },
    // }}
  >
    {loggedIn ? (
      <>
        <Stack.Screen name="Nearby Drivers" component={NearbyDrivers} />
        <Stack.Screen name="Driver" component={DriverInfo} options={{ headerShown: false }} />
        <Stack.Screen name="Hire Driver" component={HireDriver} options={{ headerShown: false }} />
      </>
    ) : (
      <>
        <Stack.Screen name="Driver Login" component={DriverLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Driver Signup" component={DriverSignup} options={{ headerShown: false }} />
      </>
    )}
  </Stack.Navigator>
</NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
