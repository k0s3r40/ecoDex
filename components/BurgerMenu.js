import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BurgerMenu = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <View style={styles.line} />
                <View style={styles.line} />
                <View style={styles.line} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: 25,
        height: 3,
        backgroundColor: 'black',
        margin: 2,
    }
});

export default BurgerMenu;
