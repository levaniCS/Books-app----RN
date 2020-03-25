import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const StarterScreen = (props) => {
  return (
    <View>
      <Text>StarterScreen</Text>
      <Button
        onPress={() => props.navigation.navigate('Auth')}
        title='Go to Auth'
      />
    </View>
  );
};

export default StarterScreen;

const styles = StyleSheet.create({});
