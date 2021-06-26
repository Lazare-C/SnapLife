import React, { useState } from 'react';
import { Button, TextInput, Alert, Text, FlatList  } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


export default function PhoneSignIn({navigation}) {
  // If null, no SMS has been sent
  const [confirm , setConfirm] : FirebaseAuthTypes.ConfirmationResult | any = useState(null);
  const  [user, setUser]: FirebaseAuthTypes.User | any = useState( auth().currentUser);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');


  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(addRegionCode(phoneNumber));
      console.log(confirmation);
     return setConfirm(confirmation);
    } catch (error) {
      console.error(error.message);
    }
  }

  function addRegionCode(phoneNumber: string){
   return phoneNumber.includes('+') ? phoneNumber : '+33'+ phoneNumber
  }


  async function confirmCode(code ) {
    try {
       setUser(await confirm.confirm(code));
      console.log(confirm);
    } catch (Error) {
      console.log('Invalid code.' + Error);
    }
  }

  async function changeName(user: FirebaseAuthTypes.User,dpname: string ) {
    try {

        await auth().currentUser.updateProfile({
            displayName: dpname,
          });
   
          console.log(user.displayName);
          
    } catch (Error: any) {
        console.error(Error);
    }
      
  }



  if(user){


    return(



<>
<Text>{JSON.stringify(user)}</Text>
<Button title="update" onPress={() => { auth().signOut(); setUser()}}/>

<Button title="Back" onPress={() =>  navigation.navigate('Home')}/>

</>
    )
  }

  if (!confirm && !user) {
    return (
    <>
      <TextInput 
      value={phone} 
      autoCompleteType = 'tel'
      autoFocus = {true}
      keyboardType = 'phone-pad'
      onSubmitEditing={() => signInWithPhoneNumber(phone)}
      onChangeText={phone => setPhone(phone)} />
      <Button title="Phone Number Sign In" onPress={() => signInWithPhoneNumber(phone)}/>
    </>
    );
  }
else if(confirm && !user)
  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode(code)} />
    </>
  );
}