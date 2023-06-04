import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserInterfacePage from "./components/UserInterfacePage";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerComponent from "./components/DrawerComponent";
import ResultPage from "./components/ResultPage";
import { getUserData } from "./services/api";

const Drawer = createDrawerNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!user ) {
        // const userData = await getUserData();
        // if (userData) {
        //   setUser(userData);
        // }
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    // console.log(user);
  }, [user]);

  return (
    <NavigationContainer>
       <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerComponent {...props} />}>
        <Drawer.Screen name="E-Codex" component={HomePage} />
        <Drawer.Screen name="E-Codex Login" component={LoginPage} />
        <Drawer.Screen name="E-Codex Register" component={RegisterPage} />
        <Stack.Screen name="Result" component={ResultPage} />
        <Drawer.Screen
          name="E-Codex UI"
          component={UserInterfacePage}
          options={{
            headerLeft: null, // Hide the back arrow
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
