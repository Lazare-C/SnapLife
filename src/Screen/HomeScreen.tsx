import React, { useState } from 'react';
import { Button, TextInput, Alert, Text, Image } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';


export default function PhoneSignIn({navigation}) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>( auth().currentUser);
   
  return (
    <>
<Text>Wshhh {user?.displayName ||user?.phoneNumber} </Text>
{/* <Image
        source={{
          uri: 'http://localhost:9199/v0/b/snaplifelc.appspot.com/o/Sans%20titre.png?alt=media',
        }}/> */}

<Button title="LogOut" onPress={async () => {await auth().signOut(); setUser(auth().currentUser)}}/>
<Button title="Users List" onPress={() => {navigation.navigate('UserScreen')}}/>


<Button title="Picture Sender" onPress={() => {navigation.navigate('PictureSender')}}></Button>



    </>
  );
}