import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const BookItem = (props) => {
  const handleSelectItem = () => {
    props.selectItemHandler(props.id);
  };
  return (
    <TouchableOpacity
      style={props.routateMode ? styles.item2 : styles.item}
      onPress={handleSelectItem}>
      <Image
        source={{ uri: props.imageSrc }}
        style={props.routateMode ? styles.image2 : styles.image}
      />
      <View style={styles.textBox}>
        <Text style={props.routateMode ? styles.header2 : styles.header}>
          {props.header}
        </Text>
        <Text
          style={props.routateMode ? styles.description2 : styles.description}>
          {props.routateMode ? props.author : props.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    width: '100%',
    height: 200,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,

    position: 'relative'
  },
  item2: {
    flex: 1,
    width: 150,
    padding: 5,
    marginRight: 8,
    height: 200,
    flexDirection: 'column',
    marginBottom: 20,
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    width: '40%',
    height: '100%'
  },
  image2: {
    width: '100%',
    height: '50%'
  },
  textBox: {
    flex: 1,
    padding: 20,
    overflow: 'hidden',
    marginBottom: 10,
    marginRight: 10
  },
  header: {
    fontSize: 15,
    color: Colors.blackMedium,
    fontFamily: 'sansBold'
  },
  header2: {
    color: Colors.blackMedium,
    fontSize: 10,
    fontFamily: 'sansBold'
  },
  description: {
    color: Colors.blackLight,
    fontSize: 10,
    fontFamily: 'sansRegular'
  },
  description2: {
    color: Colors.black,
    fontSize: 8,
    fontFamily: 'sansRegular'
  }
});
