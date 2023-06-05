import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Camera, requestCameraPermissionsAsync} from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import {discoverAroundMe, processImage} from "../services/api";
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';


const UserInterfacePage = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
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
            allowsEditing: false,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const clearImage = () => {
        setImage(null);
    };

    const analyzeImage = async () => {
        setLoading(true);
        // convert image to base64
        let imageBase64 = await FileSystem.readAsStringAsync(image, {encoding: 'base64'});

        // hardcoded lat and lon for the example
        let lat = location.latitude;
        let lon = location.longitude;
        // call the processImage function here
        let response = await processImage(imageBase64, lat, lon);
        setLoading(false);
        console.log(response);
        navigation.navigate('E-Codex Result', {data: response});
    };
    const discover = async () => {
        let lat = location.latitude;
        let lon = location.longitude;
        let response = await discoverAroundMe(lat, lon);
        console.log(response);
        navigation.navigate('E-Codex Discover', {data: response});
    };


    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.containerMain}>
            {loading && (
            <View style={styles.absolutePosition}>
                <View style={{transform: [{scale: 2.5}]}}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            </View>)}
            <View style={[styles.container, styles.relativePosition]}>

                {image && <Image source={{uri: image}} style={{width: '80%', height: '80%'}}/>}
                {image && (
                    <View style={styles.underPicBtnContainer}>
                        <TouchableOpacity style={styles.button} onPress={analyzeImage}>
                            <Ionicons name="analytics-outline" size={25} color="#fff"/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={clearImage}>
                            <Ionicons name="trash-outline" size={25} color="#fff"/>
                        </TouchableOpacity>
                    </View>
                )}
            </View>


            <Modal
                animationType="slide"
                transparent={false}
                visible={cameraModalVisible}
            >
                <Camera style={styles.camera} ref={ref => setCamera(ref)}/>
                <TouchableOpacity style={[styles.footerBtn, styles.snapBtn, styles.cameraBtn]} onPress={takePicture}>
                    <Ionicons name="camera-outline" size={50} color="#fff"/>
                </TouchableOpacity>
            </Modal>
            <View style={styles.footer}>

                <TouchableOpacity style={styles.footerBtn} onPress={() => navigation.navigate('E-Codex Results')}>
                    <Ionicons name="list-outline" size={25} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerBtn, styles.cameraBtn]} onPress={() => setCameraModalVisible(true)}>
                    <Ionicons name="camera-outline" size={50} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn} onPress={pickImage}>
                    <Ionicons name="image-outline" size={25} color="#fff"/>
                </TouchableOpacity>
                {!image && (
                    <TouchableOpacity style={[styles.discoverBtn]} onPress={discover}>
                        <Ionicons style={styles.discoverBtnIcon} name="compass-outline" size={200} color="#fff"/>
                        <Text style={styles.buttonText}>Discover</Text>
                    </TouchableOpacity>)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    underPicBtnContainer: {
        flex: 1,
        minWidth: '100%',
        flexDirection: "row",
        justifyContent: 'center'
    },
    containerMain: {
        flex: 1,
        alignItems: 'flex-end',
        // justifyContent: 'center',
    },
    footer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 50,
        // backgroundColor: 'lightgray',
        paddingBottom: 10,
        backgroundColor: '#007BFF',
    },
    camera: {
        flex: 1,
    },
    button: {
        width: '20%',
        marginHorizontal: '5%',
        height: 50,
        backgroundColor: '#007BFF',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    deleteBtn: {
        backgroundColor: '#dc0000',
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',
    },
    footerBtn: {
        color: 'lightgray',
        textAlign: 'center',
        marginHorizontal: 50,
        flex: 1,

        justifyContent: 'center',
        margin: 'auto',
        flexDirection: 'row',
        // borderColor:'white',
        minWidth: '20%',
        minHeight: '150%',
        marginTop: 40,
        marginBottom: 0,
        paddingBottom: 0,
        // borderWidth:1,
        bottom: -5


    },
    cameraBtn: {
        position: 'absolute',
        borderRadius: 40,
        padding: 5,
        bottom: 10,
        marginBottom: 10,
        maxWidth: 80,
        backgroundColor: '#007BFF',
        borderColor: 'white',
        borderWidth: 1,
        minHeight: '100%',
        marginTop: 0,
    },
    discoverBtn: {
        position: "absolute",
        // right: -20,
        marginBottom: 100,
        bottom: 200,
        padding: 0,
        maxWidth: 2000,
        backgroundColor: 'rgba(133,79,79,0)'
    },
    discoverBtnIcon: {
        color: '#006afd',
    },
    snapBtn: {
        left: '30%'
    },
    relativePosition: {
        position: 'relative',
    },
    absolutePosition: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999999,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: 'rgba(0,0,0,0.5)', // Optional: you might want to have a semi-transparent background to emphasize the overlay
    },
    LoadingIndicator: {
        width: '100%',
        height: '100%',
        left: 0,
        zIndex: 999,
    }
});

export default UserInterfacePage;
