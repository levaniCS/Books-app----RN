import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Colors from '../constants/colors';
import authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.screen}>
      <Button title='Logout' color={Colors.grad1} onPress={onLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    marginTop: 40
  }
});
