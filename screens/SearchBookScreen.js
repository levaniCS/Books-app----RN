import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import BookList from '../components/BookList';

const SearchBookScreen = (props) => {
  const data = useSelector((state) => state.books.booksData);

  const selectItemHandler = (id) => {
    props.navigation.navigate('Detail', {
      id: id
    });
  };

  return (
    <View style={styles.screen}>
      <SearchBar style={styles.search} />
      <BookList data={data} selectItemHandler={selectItemHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10
  },
  search: {
    marginBottom: 10
  }
});

export default SearchBookScreen;
