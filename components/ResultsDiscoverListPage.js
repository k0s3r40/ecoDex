import React, {useCallback} from 'react';
import {ScrollView, Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';

const DiscoverListPage = ({navigation, route}) => {
    const { data: discoveries } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {discoveries && (
                <View style={styles.DiscoveryListContainer}>
                    {discoveries.map((item, index) => (
                        <TouchableOpacity
                            style={[styles.drawerItem, styles.DiscoveryContainer]}
                            key={index}
                        >
                            <Text style={styles.drawerItemText}>{item.name}</Text>
                            <Image style={styles.image} source={{uri: item.image}} resizeMode="contain"/>
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
    DiscoveryContainer: {
        flex: 1,
        minWidth: '48%',
        maxHeight: 400,
        minHeight: 400,
        marginHorizontal:'1%',
        marginVertical: 10,
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10
    },
    drawerItemText: {
        textAlign: 'center'
    },
    DiscoveryListContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
    }
});

export default DiscoverListPage;
