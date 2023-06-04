import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {registerApi, storeData} from '../services/api';

const RegisterPage = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const data = {
                username: username,
                email: email,
                password: password,
            };
            const response = await registerApi(data);
            console.log(response.access)
            await storeData('token', response.access)
            navigation.navigate('E-Codex')
        } catch (error) {
            console.error('Failed to register', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/splashscreen.png')}/>
            <TextInput
                style={styles.textinput}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
            />
            <TextInput
                style={styles.textinput}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    textinput: {
        width: '90%',
        fontSize: 24,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderColor: 'black'
    },
    button: {
        width: '90%', // Width 90% of the container
        height: 50,
        marginBottom: 10,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
});

export default RegisterPage;
