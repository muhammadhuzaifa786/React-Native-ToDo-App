import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../Screens/App.js'
import Home from '../Screens/Home.js'
import AddTodo from '../Screens/AddTodo.js'
import EditTodo from '../Screens/EditTodo.js'
import Login from '../Screens/Login.js'
import SignUp from '../Screens/SignUp.js'

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      <Stack.Screen name="App" options={{
          title:"App",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerStyle:{
            backgroundColor:"green"
          }
        }} component={App} />


        <Stack.Screen name="Home" options={{
          title:"Home",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerLeft: null,
          headerStyle:{
            backgroundColor:"green"
          }
        }} component={Home} />


        <Stack.Screen name="Login" options={{
          title:"Login",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
            headerLeft: null,
          headerStyle:{
            backgroundColor:"green"
          }
        }} component={Login} />


        <Stack.Screen name="SignUp" options={{
          title:"SignUp",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"green"
          }
        }} component={SignUp} />


        <Stack.Screen name="Add Todo" options={{
          title:"Add Todo",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"green"
          }}} component={AddTodo} />


        <Stack.Screen name="Edit Todo" options={{
          title:"Edit Todo",
          headerTitleStyle:{
            color:"white",
            fontWeight:"bold",
            fontSize:25
          },
          headerTintColor: '#fff',
          headerStyle:{
            backgroundColor:"green"
          }}} component={EditTodo} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;