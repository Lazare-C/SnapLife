import React, { useState } from 'react';
import { Button, TextInput, Alert, Text } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export default function PictureSender() {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser);
    
    async function sendPict(url){
        const filename = user.uid;
        console.log(filename);

        try {
            const reference = await storage().ref(filename);
            const task = await reference.putFile(url);
            console.log(task );
        } catch (error) {
           console.log(error); 
        }
    }
    return(
<>
<Button
title = "Launch"
onPress= {() =>{launchImageLibrary({mediaType: 'photo', includeBase64: false},(assets) => sendPict(assets.assets[0].uri))}}
/>
</>
    )

}