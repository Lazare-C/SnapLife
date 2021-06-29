
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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


      async function getUrlStorage(object){
      }
      


      const getMoviesFromApiAsync = async () => {
        try {
          let response = await fetch(
            'https://reactnative.dev/movies.json'
          );
          let json = await response.json();
          console.log(json);
          return json.movies;
         
          
        } catch (error) {
          console.error(error);
        }
      };
     getMoviesFromApiAsync()
      

      return (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={{ height: 600, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>User ID: {item.id}</Text>
              <Text>Last picture: {item.LastPicture}</Text>
              <Image
                source={{uri: item.LastPicture
                  }}
                  style={{ width: 200, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                  />
                <Text>User ID: {item.id}</Text>
            </View>
          )}
        />
      );
}
