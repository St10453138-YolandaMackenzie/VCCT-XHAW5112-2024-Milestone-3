import React, { useState } from 'react'; 
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, FlatList } from 'react-native'; // Added Modal and FlatList
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


type NavigationOption = {
  name: keyof RootStackParamList; 
};


type ButtonProps = {
  title: string;
  navigateTo: keyof RootStackParamList;
  color: string; 
  navigation: any; 
};

const Button: React.FC<ButtonProps> = ({ title, navigateTo, color, navigation }) => {
  return (
    <TouchableOpacity 
      style={[styles.buttonContainer, { backgroundColor: color }]} 
      onPress={() => navigation.navigate(navigateTo)} 
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const App = ({ navigation }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isSearchActive, setIsSearchActive] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [fontsLoaded, setFontsLoaded] = useState(true); 

  const toggleDescription = () => {
    setIsExpanded(!isExpanded); 
  };

  // Navigation options for the modal
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


  const courses = [
    { id: '1', title: 'Six-Month Long Course in Sewing' },
    { id: '2', title: 'Six-Week Short Course in Cooking' },
    { id: '3', title: 'First Aid Training Course' },
    { id: '4', title: 'Child Minding Course' },
    { id: '5', title: 'Gardening Maintenance Course' },
  ];

  // Function to handle search bar
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
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

  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.searchContainer, isSearchActive && styles.searchContainerActive]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              placeholderTextColor="#fff"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <Icon name="magnify" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Quote')}>
              <Icon name="cart" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
              <Icon name="tune" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal for Navigation Options */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <FlatList
                data={navigationOptions}
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

        {/* Grid Layout */}
        <View style={styles.gridContainer}>
          {/* About Us Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.title}>About Us</Text>
            <Text 
              style={styles.description} 
              numberOfLines={isExpanded ? 0 : 7} 
              ellipsizeMode="tail"
            >
              Empowering the Nation was established in 2018 and offers courses in Johannesburg.
              Hundreds of domestic workers and gardeners have been trained on both the six-month long
              Learnerships and six-week Short Skills Training Programmes to empower themselves and 
              provide more marketable skills.
            </Text>
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.seeMore}>
                {isExpanded ? "See Less" : "See More"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Image of "we_are_nation" section */}
          <View style={styles.topRightImageContainer}>
            <Image 
              source={require('../assets/we_are_nation.jpg')} 
              style={styles.largeImage} 
            />
          </View>

          {/*Image of Johannesburg section */}
          <View style={styles.bottomLeftImageContainer}>
            <Image 
              source={require('../assets/johannesburg.jpg')} 
              style={styles.image}
            />
          </View>

          {/* Locations section */}
          <View style={styles.locationsContainer}>
            <Text style={styles.subtitle}>Our Locations</Text>
            <Text style={styles.location}>📍 Sandton City</Text>
            <Text style={styles.location}>📍 Rosebank Mall</Text>
            <Text style={styles.location}>📍 Mall of Africa</Text>
          </View>
        </View>

        {/* Search Results */}
        {searchQuery ? (
          <View style={styles.searchResults}>
            <Text style={styles.subtitle}>Search Results:</Text>
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <Text key={course.id} style={styles.courseItem}>{course.title}</Text>
              ))
            ) : (
              <Text style={styles.noResults}>No results found.</Text>
            )}
          </View>
        ) : null}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Six-Month Courses" navigateTo="LongCourses" color="#001F3F" navigation={navigation} />
          <Button title="Six-Week Courses" navigateTo="ShortCourses" color="#001F3F" navigation={navigation} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  icon: {
    fontSize: 24,
  },
  
  // Grid Layout Styles
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

  // Title and Description Styles
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
    flexShrink: 6,      
    marginTop: 50,
  },
  seeMore: {
    color: '#007BFF',   
    marginTop: 10,
    fontSize: 14,
  },
  
  // Button Styles
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
    width: 100,
    marginLeft: 120,
  },
  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#ff9800',
    borderRadius: 10,
    overflow: 'hidden',
    height: 35,
    width: 35,
    marginLeft: 250,
    elevation: 5,
  },
  searchContainerActive: {
    flexDirection: 'row',
    width: '100%', 
  },
  searchInput: {
    flex: 1,
    alignItems: 'center',
    color: 'white',
    height: '100%',
  },
  searchButton: {
    backgroundColor: '#ff9800',
    padding: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalItemText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchResults: {
    marginTop: 20,
  },
  courseItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  noResults: {
    fontSize: 16,
    color: '#7F8C8D',
  },
});

export default App;
