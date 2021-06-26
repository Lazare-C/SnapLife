import React, { useState } from 'react';
import { Button, TextInput, Alert, Text } from 'react-native';
import auth from '@react-native-firebase/auth';


export default function PhoneSignIn({navigation}) {
  const [user, setUser] = useState( auth().currentUser);


  return (
    <>

<Text>Wshhh {user?.displayName ||user?.phoneNumber} </Text>


<Button title="LogOut" onPress={async () => {await auth().signOut(); setUser(auth().currentUser)}}/>
    </>
  );
}