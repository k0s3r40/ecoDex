import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Camera, requestCameraPermissionsAsync} from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import {processImage} from "../services/api";
import * as Location from 'expo-location';
const UserInterfacePage = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
const [location, setLocation] = useState(null);

    const getPermissionsAsync = async () => {
        const {status} = await requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    useEffect(() => {
        getPermissionsAsync();
    }, []);
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let locationSubscriber = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 5000, // Update every 5 seconds
                distanceInterval: 0, // Update any time we move
            }, newLocation => {
                setLocation(newLocation.coords);
            });

            return () => locationSubscriber.remove();
        })();
    }, []);
    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
            setCameraModalVisible(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const clearImage = () => {
        setImage(null);
    };

    const analyzeImage = async () => {
        // convert image to base64
        let imageBase64 = await FileSystem.readAsStringAsync(image, {encoding: 'base64'});

        // hardcoded lat and lon for the example
        let lat = location.latitude;
        let lon = location.longitude;
        // call the processImage function here
        let response = await processImage(imageBase64, lat, lon);
        console.log(response);
          navigation.navigate('Result', {data: response});
    };

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}
            <TouchableOpacity style={styles.button} onPress={() => setCameraModalVisible(true)}>
                <Text style={styles.buttonText}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image from gallery</Text>
            </TouchableOpacity>
            {image && <TouchableOpacity style={styles.button} onPress={analyzeImage}>
                <Text style={styles.buttonText}>Analyze</Text>
            </TouchableOpacity>
            }
            {image && <TouchableOpacity style={styles.button} onPress={clearImage}>
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            }

            <Modal
                animationType="slide"
                transparent={false}
                visible={cameraModalVisible}
            >
                <Camera style={styles.camera} ref={ref => setCamera(ref)}/>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.buttonText}>Snap</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    button: {
        width: '90%',
        marginLeft: '5%',
        height: 50,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default UserInterfacePage;
