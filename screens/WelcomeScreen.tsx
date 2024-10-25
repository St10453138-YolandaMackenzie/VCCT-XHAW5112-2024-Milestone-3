import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Home' as never);
    }, 5000);

    return () => clearTimeout(timer);
  }, [animation, navigation]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.tagline, { transform: [{ scale }] }]}>
        Empowering the Nation
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F3F', // Navy blue background
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  tagline: {
    textAlign: 'center',
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#FFFFFF', 
  },
});

export default WelcomeScreen;
