import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserInterfacePage from "./components/UserInterfacePage";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import ResultPage from "./components/ResultPage";
import { getUserData } from "./services/api";
import ResultsListPage from "./components/ResultsListPage";

const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="E-Codex" component={HomePage} />
        <Stack.Screen name="E-Codex Login" component={LoginPage} />
        <Stack.Screen name="E-Codex Register" component={RegisterPage} />
        <Stack.Screen name="E-Codex Result" component={ResultPage} />
        <Stack.Screen name="E-Codex Results" component={ResultsListPage} />
        <Stack.Screen
          name="E-Codex UI"
          component={UserInterfacePage}
          options={{
            headerLeft: null, // Hide the back arrow
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
