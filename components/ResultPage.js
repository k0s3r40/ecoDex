import React from 'react';
import {ScrollView, Text, StyleSheet, Image, View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import {renderCategoryIcon, renderStars} from "../services/attrs";

const ResultPage = ({route}) => {
    const {data} = route.params;

    const base64Image = `data:image/jpeg;base64,${data.image}`;
    let base64Image2 = null;
    if (data.europeana_data) {
        base64Image2 = `data:image/jpeg;base64,${data.europeana_data.image}`;
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.TopRowView}>
                <View style={styles.starContainer}>
                    {renderStars(data.specimen_class)}
                </View>

                <View style={styles.starContainer}>
                    {renderCategoryIcon(data.specimen.category)}

                </View>

            </View>
            <Text style={styles.textTitle}>{data.specimen.name}</Text>
            <Text style={styles.textDescription}>{data.specimen.description}</Text>
            <Image style={styles.image} source={{uri: base64Image}} resizeMode="contain"/>
            {data.europeana_data && (
                <React.Fragment>
                    <Text style={styles.textTitle}>A legendary explorer once found here </Text>
                    <Text style={styles.textDescription}>{data.europeana_data.name}</Text>
                    <Image style={styles.image} source={{uri: base64Image2}} resizeMode="contain"/>
                    <Text style={styles.textDescription}>{data.europeana_data.description}</Text>
                </React.Fragment>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopRowView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    textTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    textDescription: {
        textAlign: "left",
        fontSize: 20,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    image: {
        width: '100%',
        height: 300,
        marginTop: 10,
    },
});

export default ResultPage;
