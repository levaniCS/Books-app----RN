import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs
} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome
} from '@expo/vector-icons';
import { Platform } from 'react-native';

import AuthScreen from '../screens/AuthScreen';
import DetailScreen from '../screens/DetailScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import HomeScreen from '../screens/HomeScreen';
import StarterScreen from '../screens/StarterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchBookScreen from '../screens/SearchBookScreen';

import DiscoverScreen from '../screens/DiscoverScreen';
import PopularScreen from '../screens/PopularScreen';
import RecommendedScreen from '../screens/RecommendedScreen';
import Startup from '../screens/Startup';

import Colors from '../constants/colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.whiteLight
  },
  headerTitleStyle: {
    fontFamily: 'sansBold'
  },
  headerTintColor: Colors.blackMedium,
  TransitionSpecs: {
    open: TransitionPresets.ScaleFromCenterAndroid,
    close: TransitionSpecs.FadeInFromBottomAndroidSpec
  }
};

const InnerNavigation = createStackNavigator(
  {
    Home: HomeScreen,
    Detail: DetailScreen,
    Favourite: FavouritesScreen,
    SearchBook: SearchBookScreen,
    Discover: DiscoverScreen,
    Popular: PopularScreen,
    Recommended: RecommendedScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FavNavigator = createStackNavigator(
  {
    Favourites: FavouritesScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const ProfNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);
const SearchNavigator = createStackNavigator(
  {
    Search: SearchBookScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const tabScreenConfig = {
  Books: {
    screen: InnerNavigation,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialCommunityIcons
            name='compass-outline'
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: Colors.red
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tapBarLabel: 'Search',
      tabBarIcon: (tabInfo) => {
        return <AntDesign name='search1' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.blackMedium
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tapBarLabel: 'Saved',
      tabBarIcon: (tabInfo) => {
        return (
          <FontAwesome name='bookmark' size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.blackLight
    }
  },
  Profile: {
    screen: ProfNavigator,
    navigationOptions: {
      tapBarLabel: 'My Profile',
      tabBarIcon: (tabInfo) => {
        return <AntDesign name='user' size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: Colors.black
    }
  }
};

const BooksFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: Colors.whiteDark,
        shifting: true
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontWeight: 'bold'
          },
          activeTintColor: 'orange'
        }
      });

const WelcomeScreens = createSwitchNavigator({
  Starter: StarterScreen,
  Auth: AuthScreen,
  Books: BooksFavTabNavigator
});

const MainNavigator = createSwitchNavigator({
  Welcome: WelcomeScreens,
  Startup: Startup,
  Books: BooksFavTabNavigator
});

export default createAppContainer(MainNavigator);
