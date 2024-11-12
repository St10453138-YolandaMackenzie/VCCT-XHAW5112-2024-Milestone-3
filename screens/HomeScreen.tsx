import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type NavigationOption = {
  name: keyof RootStackParamList;
};

// Define navigation options outside the component
const navigationOptions: NavigationOption[] = [
  { name: 'Welcome' },
  { name: 'Home' },
  { name: 'ShortCourses' },
  { name: 'LongCourses' },
  { name: 'FirstAid' },
  { name: 'Sewing' },
  { name: 'Landscaping' },
  { name: 'LifeSkills' },
  { name: 'ChildMinding' },
  { name: 'Cooking' },
  { name: 'GardenMaintenance' },
  { name: 'Quote' },
  { name: 'ContactUs' },
];

const App = ({ navigation }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredOptions, setFilteredOptions] = useState<NavigationOption[]>(navigationOptions);

  // Function to filter navigation options based on search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredOptions(navigationOptions); // Reset to all options if search is cleared
    } else {
      const filtered = navigationOptions.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase()) // Filter based on the query
      );
      setFilteredOptions(filtered);
    }
  };

  const handleNavigation = (page: keyof RootStackParamList, params?: any) => {
    setModalVisible(false);
    try {
      navigation.navigate(page, params);
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to navigate to the selected page.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Search Icon */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Icon name="magnify" size={30} color="Orange" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Quote')}>
            <Icon name="cart" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Icon name="tune" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* Modal for Navigation Options with Search Bar */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Search Bar */}
              <TextInput
                style={styles.searchInput}
                placeholder="Search pages..."
                value={searchQuery}
                onChangeText={handleSearch} // Trigger search on text change
              />
              <FlatList
                data={filteredOptions} // Use filtered options
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleNavigation(item.name)}>
                    <Text style={styles.modalItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* About Us Section */}
        <View style={styles.gridContainer}>
          <View style={styles.aboutSection}>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.description} numberOfLines={isExpanded ? 0 : 7} ellipsizeMode="tail">
              Empowering the Nation was established in 2018 and offers courses in Johannesburg. Hundreds of domestic workers and gardeners have been trained on both the six-month long Learnerships and six-week Short Skills Training Programmes to empower themselves and provide more marketable skills.
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.seeMore}>{isExpanded ? 'See Less' : 'See More'}</Text>
            </TouchableOpacity>
          </View>

          {/* Image Section */}
          <View style={styles.topRightImageContainer}>
            <Image source={require('../assets/we_are_nation.jpg')} style={styles.largeImage} />
          </View>

          <View style={styles.bottomLeftImageContainer}>
            <Image source={require('../assets/johannesburg.jpg')} style={styles.image} />
          </View>

          {/* Locations Section */}
          <View style={styles.locationsContainer}>
            <Text style={styles.subtitle}>Our Locations</Text>
            <Text style={styles.location}>📍 Sandton City</Text>
            <Text style={styles.location}>📍 Rosebank Mall</Text>
            <Text style={styles.location}>📍 Mall of Africa</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LongCourses')}>
            <Text style={styles.buttonTitle}>Six-Month Courses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShortCourses')}>
            <Text style={styles.buttonTitle}>Six-Week Courses</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalItemText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  aboutSection: {
    flexBasis: '45%',
    marginBottom: 10,
  },
  topRightImageContainer: {
    flexBasis: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  largeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 100,
  },
  bottomLeftImageContainer: {
    flexBasis: '45%',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  locationsContainer: {
    flexBasis: '45%',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 0,
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 22,
    marginTop: 50,
  },
  seeMore: {
    color: '#007BFF',
    marginTop: 10,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#001F3F',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 40,
    marginBottom: 10,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
