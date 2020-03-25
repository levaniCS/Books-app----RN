import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const AuthScreen = (props) => {
  return (
    <View>
      <Text>AuthScreen</Text>
      <Button
        onPress={() => props.navigation.navigate('Books')}
        title='Go to Books'
      />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
