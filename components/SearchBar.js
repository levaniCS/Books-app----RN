import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Searchbar } from 'react-native-paper';

import * as actions from '../store/actions/books';
import Colors from '../constants/colors';

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const handleIconPress = () => {
    dispatch(actions.getSearchedBooks(searchTerm));
    props.navigation && props.navigation.navigate('Search');
  };
  return (
    <Searchbar
      style={props.style}
      placeholderTextColor={Colors.greyLight}
      iconColor={Colors.greyDark}
      placeholder='Search book'
      value={searchTerm}
      onChangeText={(text) => setSearchTerm(text)}
      onIconPress={handleIconPress}
    />
  );
};

export default SearchBar;
