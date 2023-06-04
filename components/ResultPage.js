import React from 'react';
import { ScrollView, Text, StyleSheet, Image } from 'react-native';

const ResultPage = ({ route }) => {
  const { data } = route.params;

  const base64Image = `data:image/jpeg;base64,${data.image}`;
  let base64Image2 = null;
  if (data.europeana_data) {
    base64Image2 = `data:image/jpeg;base64,${data.europeana_data.image}`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*<Text style={styles.text}>Latitude: {data.latitude}</Text>*/}
      {/*<Text style={styles.text}>Longitude: {data.longitude}</Text>*/}
      <Text style={styles.textTitle}>{data.specimen.name}</Text>
      <Text style={styles.textDescription}>{data.specimen.description}</Text>
      {/*<Text style={styles.text}>Timestamp: {data.timestamp}</Text>*/}
      <Image style={styles.image} source={{ uri: base64Image }} />
      {data.europeana_data && (
        <React.Fragment>
            {/*<Text style={styles.textTitle}>-------</Text>*/}
            <Text style={styles.textTitle}>A legendary explorer once found here </Text>
            {/*<Text style={styles.textTitle}>-------</Text>*/}
          <Text style={styles.textDescription}>{data.europeana_data.name}</Text>
          <Image style={styles.image} source={{ uri: base64Image2 }} />
          <Text style={styles.textDescription}>{data.europeana_data.description}</Text>
        </React.Fragment>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textTitle:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20,
    textAlign:'center',
    marginTop:20,
  },
  textDescription:{
    textAlign:"left",
    fontSize:20,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16, // You can adjust the padding as needed
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 500,
    marginTop: 10,
  },
});

export default ResultPage;
