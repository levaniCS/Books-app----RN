import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Colors from '../constants/colors';

import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const switchModeHandler = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Books');
    } catch (error) {
      // throwed error from auth actions :)
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <LinearGradient
        colors={[Colors.grad1, Colors.grad2]}
        style={styles.gradient}>
        <FontAwesome name='home' size={50} color={Colors.blackMedium} />
        <Text style={styles.headerTitle}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      </LinearGradient>
      <View style={styles.authContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            id='email'
            label='E-Mail'
            keyboardType='email-address'
            required
            email
            autoCapitalize='none'
            errorText='Please enter a valid email address!'
            onInputChange={inputChangeHandler}
            initialValue=''
          />
          <Input
            id='password'
            label='Password'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            autoCapitalize='none'
            errorText='Please enter a valid password !'
            onInputChange={inputChangeHandler}
            initialValue=''
          />
          <View style={styles.btns}>
            <LinearGradient
              style={styles.btnGradient}
              colors={[Colors.grad1, Colors.grad2]}>
              <TouchableOpacity
                start={[0, 0]}
                style={styles.btnContainer}
                onPress={authHandler}>
                {isLoading ? (
                  <ActivityIndicator size='small' color={Colors.blackMedium} />
                ) : (
                  <Text style={styles.btnText}>
                    {isSignUp ? 'Sign Up' : 'Login'}
                  </Text>
                )}
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              style={styles.btnGradient}
              colors={[Colors.grad1, Colors.grad2]}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={switchModeHandler}>
                <Text style={styles.btnText}>{`Switch to ${
                  isSignUp ? 'Login' : 'Sign Up'
                }`}</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.whiteDark,
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomLeftRadius: 170
  },
  headerTitle: {
    fontSize: 30,
    marginTop: 10,
    paddingBottom: 10,
    fontFamily: 'sansBold',
    textTransform: 'uppercase',
    letterSpacing: 5,
    color: Colors.blackMedium
  },
  authContainer: {
    width: '80%',
    height: '80%',
    maxWidth: 400,
    maxHeight: 400,
    paddingTop: 30
  },
  btnGradient: {
    borderRadius: 200,
    padding: 5,
    marginTop: 20
  },
  btnContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    fontFamily: 'sansBold'
  },
  btnText: {
    fontFamily: 'sansBold',
    textTransform: 'uppercase',
    color: Colors.blackMedium
  }
});
