import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSightingById, getUserData } from '../services/api';

const DrawerComponent = ({ navigation }) => {
  const handleDrawerItemPress = async (id) => {
    // Handle the onPress event for each drawer item
    // Add the necessary navigation logic here
    const response = await getSightingById(id);
    navigation.navigate('Result', { data: response });
  };


 return (
    <View style={styles.container}>
      <View style={styles.imageview}>
        <Image style={styles.image} source={require('../assets/splashscreen.png')} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {user?.sightings && (
          <View>
            {user.sightings.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.drawerItem}
                onPress={() => handleDrawerItemPress(item.id)}
              >
                <Text style={styles.drawerItemText}>{item.specimen.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>

  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  image: {
    marginTop: 10,
    height: 100,
    width: 100,
  },
  imageview: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 120,
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  drawerItem: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default DrawerComponent;