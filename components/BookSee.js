import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking
} from 'react-native';
import { MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';

import Colors from '../constants/colors';

const BookSee = (props) => {
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.block}
        onPress={() => Linking.openURL(props.reviewUrl)}>
        <MaterialCommunityIcons
          name='comment-text-multiple-outline'
          size={28}
          color={Colors.greyDark}
        />
        <Text style={styles.name}>See Reviews</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => Linking.openURL(props.readUrl)}>
        <Entypo name='open-book' size={28} color={Colors.greyDark} />
        <Text style={styles.name}>Read Book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        onPress={() => Linking.openURL(props.volumeUrl)}>
        <Feather name='volume-2' size={28} color={Colors.greyDark} />
        <Text style={styles.name}>Listen Book</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookSee;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16,
    marginRight: 16,
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.greyLight
  },
  block: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.greyDark
  }
});
