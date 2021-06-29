/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   Button,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import NavigationHome from './src/navigation/Navigation';


 import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


 const App = () => {

  if (__DEV__) {
    console.log('DEBUG FIREBASE');
    firestore().settings({ host: 'localhost:8080', ssl: false });
auth().useEmulator('http://localhost:9099')
storage().useEmulator('localhost', 9199)

}







 return NavigationHome();

 };


 export default App;
