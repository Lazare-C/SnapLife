
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Image } from 'react-native-elements';

export default function UserScreen({navigation}) {
    const [users, setUsers] = useState('');
    const [user, setUser] = useState( auth().currentUser);

    useEffect(() => {
        const subscriber = firestore()
          .collection('Users')
          //.where('id', '!=', user.uid )
          .onSnapshot(querySnapshot => {
            const users: { key: string; }[] = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setUsers(users);
          });
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
      
      async function getJWT(){
        const token = await user.getIdTokenResult(true) 
        return token.token;
      }    

      async function urlStorage(url){
        try {
          let link = await storage().ref(url).getDownloadURL()
          console.log(link);
         return link
        } catch (error) {
          return ''
        }
      };
      async function getMoviesFromApiAsync(link) {
        try {
          let jwt = await getJWT();
          console.log(jwt);  
          let response = await fetch(
            link +'&auth=' + jwt, {  method: 'GET',
      }
          );
          let json = await response;
          console.log(await json.text());
          return json;
        } catch (error) {
          console.error(error);
        }
      };
      
      




      return (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={{ height: 600, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>User ID: {item.id}</Text>
              <Text>Last picture: {item.LastPicture}</Text>
              
              <Image
                source={{uri: urlStorage(item.LastPicture), headers: {
                  Authorization: 'Bearer' +  getJWT()
                },
                  }}
                  style={{ width: 200, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                  onPress={()=>{getMoviesFromApiAsync(item.LastPicture)}}
                  />
                <Text>User ID: {item.id}</Text>
            </View>
          )}
        />
      );
}
