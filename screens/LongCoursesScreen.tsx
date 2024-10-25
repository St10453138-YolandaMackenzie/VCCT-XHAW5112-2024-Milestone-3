import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Alert,Image } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type LongCoursesScreenProps = NativeStackScreenProps<RootStackParamList, 'LongCourses'>;

export default function LongCoursesScreen({ navigation }: LongCoursesScreenProps) {
  // Load fonts
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  // State for modal visibility
  const [modalVisible, setModalVisible] = React.useState(false);

  // Navigation options for the modal
  const navigationOptions: { name: keyof RootStackParamList; label: string }[] = [
    { name: 'Welcome', label: 'Welcome' },
    { name: 'Home', label: 'Home' },
    { name: 'ShortCourses', label: 'Six-Weeks Courses' },
    { name: 'LongCourses', label: 'Six-Months Courses' },
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

  // Function to handle navigation
  const handleNavigation = (page: keyof RootStackParamList, params?: any) => {
    setModalVisible(false); 
    try {
      navigation.navigate(page, params); 
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to navigate to the selected page.');
    }
  };

  
  type ButtonProps = {
    title: string;
    navigateTo: keyof RootStackParamList;
    color: string; 
  };

  const Button: React.FC<ButtonProps> = ({ title, navigateTo, color }) => {
    return (
      <TouchableOpacity 
        style={[styles.buttonContainer, { backgroundColor: color }]} 
        onPress={() => handleNavigation(navigateTo)} 
      >
        <Text style={styles.buttonTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {/* Logo Image */}
        <Image source={require('../assets/Logo.png')} style={styles.logoImage} />
          <TouchableOpacity style={styles.iconButton} onPress={() => handleNavigation('Quote')}>
            <Icon name="cart" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Icon name="tune" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.headerTitle}>Long-Term Courses</Text>

      <Button title="First Aid" navigateTo="FirstAid" color="#e57373" />
      <Button title="Sewing" navigateTo="Sewing" color="#81c784" />
      <Button title="Landscaping" navigateTo="Landscaping" color="#64b5f6" />
      <Button title="Life Skills" navigateTo="LifeSkills" color="#ffd54f" />

      <TouchableOpacity style={styles.bottomButton} onPress={() => handleNavigation('ShortCourses')}>
        <Text style={styles.bottomButtonText}>Six weeks courses</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: 370,
    alignItems: 'center',
    elevation: 10,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
  },
  bottomButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 40,
    width: 160,
    marginLeft: 110,
    alignItems: 'center',
    elevation: 10,
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
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
    marginHorizontal: 10,
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
