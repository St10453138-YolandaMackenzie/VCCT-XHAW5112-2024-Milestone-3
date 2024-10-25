import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { RootStackParamList } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LifeSkillsDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'LifeSkills'>;

const LifeSkillsDetailsScreen: React.FC<LifeSkillsDetailsScreenProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = () => {
    navigation.navigate('Quote');
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


type NavigationOption = {
  name: keyof RootStackParamList; 
  label: string;
};
  const navigationOptions: { name: keyof RootStackParamList; label: string }[] = [
    { name: 'Welcome', label: 'Welcome' },
    { name: 'Home', label: 'Home' },
    { name: 'ShortCourses', label: 'Six Weeks Courses' },
    { name: 'LongCourses', label: 'Six Months Courses' },
    { name: 'FirstAid', label: 'First-Aid' },
    { name: 'Sewing', label: 'Sewing' },
    { name: 'Landscaping', label: 'Landscaping' },
    { name: 'LifeSkills', label: 'Life Skills' },
    { name: 'ChildMinding', label: 'Child Minding' },
    { name: 'Cooking', label: 'Cooking' },
    { name: 'GardenMaintenance', label: 'Garden Maintenance' },
    { name: 'Quote', label: 'Quote' },
    { name: 'ContactUs', label: 'Contact Us' },
  ];
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        {/* Logo Image */}
        <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
        <TouchableOpacity style={styles.iconButton} onPress={() => handleNavigation('Quote')}>
          <Icon name="cart" size={30} color="black" accessibilityLabel="Cart" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
          <Icon name="tune" size={30} color="black" accessibilityLabel="Navigation options" />
        </TouchableOpacity>
      </View>

      {/* Title for course details */}
<Text style={styles.courseDetailsTitle}>Details of Course</Text>

      <View style={styles.courseCard}>
        <Text style={styles.title}>Life Skills</Text>

        {/* Image Grid */}
        <View style={styles.imageGrid}>
          <Image source={require('../assets/life_skills1.jpg')} style={styles.gridImage} accessibilityLabel="Life Skills image 1" />
          <Image source={require('../assets/life_skills2.jpg')} style={styles.gridImage} accessibilityLabel="Life Skills image 2" />
          <Image source={require('../assets/life_skills3.jpg')} style={styles.gridImage} accessibilityLabel="Life Skills image 3" />
          <Image source={require('../assets/life_skills4.jpg')} style={styles.gridImage} accessibilityLabel="Life Skills image 4" />
        </View>

        <Text style={styles.purpose}>To provide skills to navigate basic life necessities.</Text>

        {/* Course Content */}
        <Text style={styles.contentTitle}>Course Content:</Text>
        <Text style={styles.listItem}>• Opening a bank account</Text>
        <Text style={styles.listItem}>• Basic labour law (know your rights)</Text>
        <Text style={styles.listItem}>• Basic reading and writing literacy</Text>
        <Text style={styles.listItem}>• Basic numeric literacy</Text>

        <View style={styles.checkmarkSection}>
          <Text style={styles.checkmarkText}>✔️ Regular Options</Text>
          <Text style={styles.checkmarkText}>✔️ Flexible start every two weeks</Text>
          <Text style={styles.checkmarkText}>✔️ Up to 15% discount for multiple course selection</Text>
        </View>

        {/* Fee Display */}
        <View style={styles.feeContainer}>
          <Text style={styles.fee}>R1500</Text>
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          style={styles.registerButton} 
          onPress={handleRegister} 
          accessibilityLabel="Register for the Life Skills course"
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for navigation */}
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleNavigation(item.name)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
              style={styles.modalList}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 240, 
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  iconButton: {
    marginLeft: 10,
  },
  courseDetailsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins_400Regular',
    marginRight: 50,
  },
  courseCard: {
    backgroundColor: '#FDF4F3',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#FFE600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',  
    fontFamily: 'Poppins_400Regular',
    backgroundColor: '#001F3F',  // navy blue background
    padding: 5,  
    borderRadius: 2,  
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  gridImage: {
    width: '48%', 
    height: 100, 
    borderRadius: 8,
    marginBottom: 8,
  },
  checkmarkSection: {
    marginTop: 16,
    marginBottom: 16,
  },
  checkmarkText: {
    fontSize: 14,
    color: '#1A237E', 
    marginVertical: 4,
  },
  feeContainer: {
    backgroundColor: '#001F3F',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    marginTop: 8,
    alignSelf: 'flex-end',
    width: 100,
  },
  fee: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold', 
  },
  purpose: {
    fontSize: 14,
    color: '#000',
    marginVertical: 10,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    fontSize: 14,
    color: '#666',
  },
  registerButton: {
    backgroundColor: '#F57C00',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  registerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    marginTop: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: 'white',
  },
  modalList: {
    marginTop: 10,
  },
});

export default LifeSkillsDetailsScreen;