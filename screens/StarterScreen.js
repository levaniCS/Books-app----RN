import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Colors from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const StarterScreen = (props) => {
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name='md-arrow-round-forward'
          color='rgba(255, 255, 255, .9)'
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  const _renderSkipButton = () => {
    return <Text style={styles.skipBtn}>Skip</Text>;
  };

  const _renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Auth')}
        style={styles.buttonCircle}>
        <Ionicons
          name='md-checkmark'
          color='rgba(255, 255, 255, .9)'
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </TouchableOpacity>
    );
  };

  const _renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[styles.mainContent, dimensions]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}>
      <Ionicons
        style={{ backgroundColor: 'transparent' }}
        name={item.icon}
        size={200}
        color='white'
      />
      <View style={styles.textArea}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </LinearGradient>
  );

  return (
    <AppIntroSlider
      slides={slides}
      showSkipButton={true}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
    />
  );
};

export default StarterScreen;

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textArea: {
    marginBottom: 60
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    fontFamily: 'sansRegular',
    textAlign: 'center',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 22,
    color: Colors.whiteLight,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'roboto',
    marginBottom: 16
  },
  skipBtn: {
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    color: Colors.whiteLight,
    fontFamily: 'sansBold'
  }
});

const slides = [
  {
    key: 'one',
    title: 'Read, Listen, Write Reviews',
    text:
      'This app provides you some interesting information about most popular books all the time',
    icon: 'md-book',
    colors: ['#63E2FF', '#B066FE']
  },
  {
    key: 'two',
    title: 'Searchable area',
    text:
      'You can search any book in google books library, just search any book name or word which you remmember',
    icon: 'ios-search',
    colors: ['#A3A1FF', '#3A3897']
  },
  {
    key: 'three',
    title: 'Add Favourites',
    text: 'You can add favourites any book and read later',
    icon: 'ios-bookmarks',
    colors: ['#29ABE2', '#4F00BC']
  }
];
