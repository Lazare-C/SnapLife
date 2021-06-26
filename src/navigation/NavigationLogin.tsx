import { NavigationContainer,  } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import login from '../Screen/login/loginScreen'

export default function NavigationLogin(){

  const LoginStack = createStackNavigator();

  
    return (
        
          <LoginStack.Navigator>           
             <LoginStack.Screen name="LoginScreen" component={login} />
          </LoginStack.Navigator>

    
    );
}