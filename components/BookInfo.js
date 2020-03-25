import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/colors';

const BookInfo = (props) => {
  const onSave = () => {
    props.toggleSave();
  };
  const saveIcon = props.isSaved ? 'bookmark' : 'bookmark-o';

  return (
    <View style={styles.infoContainer}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.authAndGenre}>
          {props.author} {'\u2022'} {props.genres}
        </Text>
        <View style={styles.review}>
          <View style={styles.reviewStars}>
            <AntDesign name='star' size={15} color={Colors.starCol} />
            <AntDesign name='star' size={15} color={Colors.starCol} />
            <AntDesign name='star' size={15} color={Colors.starCol} />
            <AntDesign name='star' size={15} color={Colors.starCol} />
            <AntDesign name='staro' size={15} color={Colors.starCol} />
            <Text style={styles.reviewRatins}>4.5</Text>
          </View>
          <Text style={styles.reviewCount}>1,233 reviews</Text>
        </View>
        <Text style={styles.authAndGenre}>Published Date: {props.date}</Text>
      </View>
      <TouchableOpacity onPress={onSave}>
        <FontAwesome name={saveIcon} size={28} color={Colors.greyDark} />
      </TouchableOpacity>
    </View>
  );
};

export default BookInfo;

const styles = StyleSheet.create({
  infoContainer: {
    margin: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mainContent: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontFamily: 'sansBold',
    marginBottom: 5
  },
  authAndGenre: {
    fontFamily: 'roboto',
    color: Colors.greyDark,
    fontSize: 13
  },
  review: {
    flex: 1,
    flexDirection: 'row'
  },
  reviewStars: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reviewRatins: {
    fontFamily: 'sansBold',
    fontSize: 15,
    color: Colors.greyDark,
    marginRight: 15,
    marginLeft: 5
  },
  reviewCount: {
    alignSelf: 'center',
    color: Colors.greyDark,
    fontFamily: 'roboto',
    fontSize: 13
  }
});
