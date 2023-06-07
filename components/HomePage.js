import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getUserData } from "../services/api";

const HomePage = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getUserData();
      setUserData(data);
      if (data.user_id) {
        navigation.navigate('E-Codex UI');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(() => {
    fetchData();
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/splashscreen.png')} resizeMode="contain"/>
      <View style={styles.btncontainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('E-Codex Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('E-Codex Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%', // 5% margin on the sides
        width: '100%'
    },
    btncontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10,
        height: 200,
        paddingHorizontal: '5%', // 5% margin on the sides
        width: '100%',

    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        width: '90%', // Width 90% of the container
    },
    button: {
        width: '90%', // Width 90% of the container
        height: 50,
        marginBottom: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    image:{
        width:'80%',
        height:'50%'
    }
});

export default HomePage;
