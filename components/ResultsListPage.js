import React, {useState, useCallback} from 'react';
import {ScrollView, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";
import {getSightingById, getUserSightings} from "../services/api";

const ResultsListPage = ({navigation}) => {
    const [sightings, setSightings] = useState(null);

    const handleDrawerItemPress = useCallback(async (id) => {
        const response = await getSightingById(id);
        navigation.navigate('E-Codex Result', {data: response});
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            async function fetchSightings() {
                if (!sightings) {
                    const userSightings = await getUserSightings();
                    if (userSightings) {
                        setSightings(userSightings);
                    }
                }
            }
            fetchSightings();
        }, [sightings])
    );

    console.log(sightings)
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {sightings && (
                <View style={styles.SightingListContainer}>
                    {sightings.map((item, index) => (
                        <TouchableOpacity
                            style={[styles.drawerItem, styles.SightingContainer]}
                            key={index}
                            onPress={() => handleDrawerItemPress(item.id)}
                        >
                            <Text style={styles.drawerItemText}>{item.specimen.name}</Text>
                            <Image style={styles.image} source={{uri: item.image_url}}/>
                            {/*<Image style={styles.image} source={{uri: `data:image/jpeg;base64,${item.image}`}}/>*/}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 10,
    },
    SightingContainer: {
        flex: 1,
        minWidth: '48%',
        maxHeight:400,
        minHeight:400,
        marginHorizontal:'1%',
        marginVertical:10,
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10
    },
    drawerItemText: {
        textAlign: 'center'
    },
    SightingListContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
    }
});

export default ResultsListPage;
