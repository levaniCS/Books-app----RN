import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

import { AntDesign } from '@expo/vector-icons';

const Section = (props) => {
  return (
    <View style={{ ...styles.section, ...props.style }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.title}</Text>
        {props.hasMore ? (
          <TouchableOpacity
            style={styles.headerLink}
            onPress={props.onMorePress}>
            <Text style={styles.arrText}>More</Text>
            <AntDesign name='arrowright' size={20} color={Colors.greyMedium} />
          </TouchableOpacity>
        ) : null}
      </View>
      {props.children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  section: {
    marginTop: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'sansBold',
    color: Colors.blackMedium,
    fontSize: 20,
    marginBottom: 10
  },
  arrText: {
    color: Colors.greyMedium,
    fontFamily: 'sansBold',
    marginRight: 2
  },
  headerLink: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
});
