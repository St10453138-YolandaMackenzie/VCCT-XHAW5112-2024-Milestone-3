import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { ScrollView } from 'react-native';
import * as Print from 'expo-print'; // to generate quote PDF
import { shareAsync } from 'expo-sharing'; // to download the generated PDF

type QuoteScreenProps = NativeStackScreenProps<RootStackParamList, 'Quote'>;

const courses = [
  { name: 'First-Aid', price: 1500 },
  { name: 'Sewing', price: 1500 },
  { name: 'Landscaping', price: 1500 },
  { name: 'Life Skills', price: 1500 },
  { name: 'Child Minding', price: 750 },
  { name: 'Cooking', price: 750 },
  { name: 'Garden Maintenance', price: 750 },
];

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

export default function QuoteScreen({ navigation }: QuoteScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  const [modalVisible, setModalVisible] = useState(false);
  const [showFees, setShowFees] = useState(false); 
  const [quoteVisible, setQuoteVisible] = useState(false); 

  const handleRegistration = () => {
    if (!fullName || !email || selectedCourses.length === 0 || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert('Success', 'Registration completed successfully');
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourses((prev) => {
      if (prev.includes(course)) {
        return prev.filter((c) => c !== course);
      } else {
        return [...prev, course];
      }
    });
  };

  const handleNavigation = (page: keyof RootStackParamList) => {
    setModalVisible(false); 
    navigation.navigate(page as never); 
  };

  const calculateFees = () => {
    const subtotal = selectedCourses.reduce((total, course) => {
      const courseData = courses.find(c => c.name === course);
      return total + (courseData ? courseData.price : 0);
    }, 0);

    const discount = subtotal > 2000 ? subtotal * 0.1 : 0;
    const vat = (subtotal - discount) * 0.15;
    const total = subtotal - discount + vat;

    return { subtotal, discount, vat, total };
  };

  const { subtotal, discount, vat, total } = calculateFees();

  const handleQuote = () => {
    setQuoteVisible(true); 
  };

  const [isSharing, setIsSharing] = useState(false); 

  const generatePDF = async () => {
    if (isSharing) {
      Alert.alert('Please wait', 'A sharing process is already in progress.');
      return; 
    }
  
    setIsSharing(true); 
  
    try {
      const html = `
        <html>
          <body>
            <h1>Quotation</h1>
            <h2>Empowering the Nation</h2>
            <h3>Address: Mall of Africa</h3>
            <h3>Tel: 0237632674</h3>
            <h3>Email: info@empoweringthenation.in</h3>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            <p>Serial Number: #${Math.floor(Math.random() * 10000)}</p>
            <table style="width: 100%; border: 1px solid black; border-collapse: collapse;">
              <tr>
                <th style="border: 1px solid black;">Course</th>
                <th style="border: 1px solid black;">Price (R)</th>
              </tr>
              ${selectedCourses.map((course) => {
                const courseData = courses.find(c => c.name === course);
                return `
                  <tr>
                    <td style="border: 1px solid black;">${course}</td>
                    <td style="border: 1px solid black;">R${courseData ? courseData.price : ''}</td>
                  </tr>
                `;
              }).join('')}
            </table>
            <p>Subtotal: R${subtotal.toFixed(2)}</p>
            <p>Discount: R${discount.toFixed(2)}</p>
            <p>VAT: R${vat.toFixed(2)}</p>
            <p>Total: R${total.toFixed(2)}</p>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      await shareAsync(uri);
    } catch (error) {
      console.error("Failed to generate or share the PDF:", error);
      Alert.alert("Error", "Failed to generate or share the PDF. Please try again.");
    } finally {
      setIsSharing(false); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={() => handleNavigation('LongCourses')}>
            <Icon name="home" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
            <Icon name="tune" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Personal Details</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Complete Registration</Text>
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.name}
              style={styles.checkboxItem}
              onPress={() => handleCourseSelect(course.name)}
            >
              <View style={[styles.checkbox, selectedCourses.includes(course.name) && styles.checkedBox]} />
              <Text style={styles.checkboxLabel}>{course.name}</Text>
              <Text style={styles.priceLabel}>R{course.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.horizontalButtonsContainer}>
          <TouchableOpacity style={styles.orangeButton} onPress={handleQuote}>
            <Text style={styles.buttonText}>Get Quote</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.orangeButton} 
            onPress={() => { 
              setShowFees(true); 
            }}
          >
            <Text style={styles.buttonText}>Calculate Fees</Text>
          </TouchableOpacity>
        </View>

        {showFees && ( 
          <View style={styles.feeDisplay}>
            <Text style={styles.feeText}>Subtotal: R{subtotal.toFixed(2)}</Text>
            <Text style={styles.feeText}>Discount: R{discount.toFixed(2)}</Text>
            <Text style={styles.feeText}>VAT (15%): R{vat.toFixed(2)}</Text>
            <Text style={styles.feeText}>Total: R{total.toFixed(2)}</Text>
          </View>
        )}

        {/* Quote Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={quoteVisible}
          onRequestClose={() => setQuoteVisible(false)}
        >
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteTitle}>Your Quote</Text>
            <Text>Courses Selected:</Text>
            {selectedCourses.map((course) => (
              <Text key={course}>{course}</Text>
            ))}
            <Text>Subtotal: R{subtotal.toFixed(2)}</Text>
            <Text>Discount: R{discount.toFixed(2)}</Text>
            <Text>VAT: R{vat.toFixed(2)}</Text>
            <Text>Total: R{total.toFixed(2)}</Text>

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadIcon} onPress={generatePDF}>
              <Icon name="download" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setQuoteVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
                    onPress={() => handleNavigation(item.name as keyof RootStackParamList)}
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
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -10, 
    fontFamily: 'Poppins_400Regular',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    marginLeft: 200,
    borderRadius: 20,
    width: 160,
    alignItems: 'center',
    marginTop: -10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 30,
    marginLeft: -50,
  },
  checkboxItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'pink',
    borderRadius: 4,
    marginRight: 10,
    elevation: 10,
  },
  checkedBox: {
    backgroundColor: 'pink',
  },
  checkboxLabel: {
    fontSize: 16,
    marginTop: -25,
    marginLeft: 170,
    width: '70%',
  },
  priceLabel: {
    fontSize: 14,
    marginLeft: 80,
    color: 'gray',
  },
  horizontalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  orangeButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 20,
    width: 160,
    alignItems: 'center',
  },
  feeDisplay: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  feeText: {
    fontSize: 16,
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
  modalList: {
    marginTop: 10,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
  quoteContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quoteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  downloadIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    textAlign: 'center',
    color: '#f57c00',
    marginTop: 20,
    fontWeight: 'bold',
  },
});