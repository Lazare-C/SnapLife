import { NavigationContainer,  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect, createContext } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import loginScreen from '../Screen/login/loginScreen'
import HomeScreen from '../Screen/HomeScreen';
import App from "../../App";

import NavigationLogin from "./NavigationLogin";
import UserScreen from "../Screen/UserScreen";
import PictureSender from "../Screen/PictureSender";

export const AuthContext = createContext(null)
export default function NavigationHome(){
  const [user, setUser] = useState( auth().currentUser);

  
    const Stack = createStackNavigator();

  


    useEffect(() => {
      const authSubscriber = auth().onAuthStateChanged(setUser)
  
      // unsubscribe on unmount
      return authSubscriber
    }, [])

    


    return  (
      <NavigationContainer>
      <AuthContext.Provider value={user}>
              <Stack.Navigator>
        {user != null ? (
             <><Stack.Screen name="Home" component={HomeScreen} />
             <Stack.Screen name="UserScreen" component={UserScreen} />
             <Stack.Screen name="PictureSender" component={PictureSender} />
             </>
          ) : (

            <Stack.Screen name="login" component={loginScreen} />
    )
  }
  </Stack.Navigator>
    </AuthContext.Provider>
    </NavigationContainer>
    )

    }