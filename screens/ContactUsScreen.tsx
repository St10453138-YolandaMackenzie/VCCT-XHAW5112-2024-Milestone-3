import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const locations = [
  { label: 'Sandton City', value: { latitude: -26.1063, longitude: 28.0457 } },
  { label: 'Rosebank Mall', value: { latitude: -26.1477, longitude: 28.0422 } },
  { label: 'Mall of Africa', value: { latitude: -25.9992, longitude: 28.0190 } },
];

const ContactUsScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].value);
  const [region, setRegion] = useState({
    latitude: locations[0].value.latitude,
    longitude: locations[0].value.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const handleLocationChange = (value: string) => {
    const selected = locations.find(loc => loc.label === value);
    if (selected) {
      setSelectedLocation(selected.value);
      setRegion({
        latitude: selected.value.latitude,
        longitude: selected.value.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  // Load fonts
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  const handleEmail = () => {
    Linking.openURL('mailto:yolanda.mackenzie@icloud.com'); 
  };

  const handleCall = () => {
    Linking.openURL('tel:+27790222402'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Contact Us</Text>
        <RNPickerSelect
          onValueChange={handleLocationChange}
          items={locations.map(loc => ({ label: loc.label, value: loc.label }))}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a location...', value: null }}
        />
        <MapView style={styles.map} region={region} showsUserLocation>
          <Marker coordinate={selectedLocation} title="Selected Location" />
        </MapView>
      </View>
      
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleEmail} style={styles.iconButton}>
          <Icon name="email" size={50} color="#001F3F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCall} style={styles.iconButton}>
          <Icon name="phone" size={50} color="#001F3F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  card: {
    backgroundColor: '#FDF4F3',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFE600',
    padding: 16,
    elevation: 4,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  map: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFA726',
    borderRadius: 12,
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FFE600',
    borderRadius: 8,
    color: '#1A237E',
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FFE600',
    borderRadius: 8,
    color: '#1A237E',
    marginBottom: 16,
    fontFamily: 'Poppins_400Regular',
  },
});

export default ContactUsScreen;
