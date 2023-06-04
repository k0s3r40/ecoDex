import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";
import {getSightingById, getUserData, getUserSightings} from "../services/api";

const ResultsListPage = ({navigation}) => {


    const [sightings, setSightings] = useState(null);
    const handleDrawerItemPress = async (id) => {
        // Handle the onPress event for each drawer item
        // Add the necessary navigation logic here
        const response = await getSightingById(id);
        navigation.navigate('E-Codex Result', {data: response});
    };

    useFocusEffect(
        React.useCallback(() => {
            async function fetchSightings() {
                if (!sightings) {
                    const Sightings = await getUserSightings();
                    if (Sightings) {
                        setSightings(Sightings);
                    }
                }
            }

            fetchSightings();
        }, [])
    );
    console.log(sightings)

    return (
        <ScrollView style={styles.scrollContainer}>
            {sightings && (
                <View style={styles.SightingListContainer}>
                    {sightings.map((item, index) => (
                        <TouchableOpacity style={[styles.drawerItem, styles.SightingContainer]}
                                          key={index}

                                          onPress={() => handleDrawerItemPress(item.id)}
                        >
                            <Text style={styles.drawerItemText}>{item.specimen.name}</Text>
                            <Image style={styles.image} source={{uri: `data:image/jpeg;base64,${item.image}`}}/>

                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 100,
        marginTop: 10,
    },
    SightingContainer: {
        minWidth: '30%',
        maxWidth: '30%',
        marginHorizontal:'1%',
        marginVertical:10,
        flex: 1,
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10
    },
    drawerItemText: {
        textAlign: 'center'
    },
    SightingListContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    }
});

export default ResultsListPage;
