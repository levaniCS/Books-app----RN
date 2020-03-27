import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
import BookList from '../components/BookList';

const RecommendedScreen = (props) => {
  const data = useSelector((state) => state.books.booksData);

  const selectItemHandler = (id) => {
    props.navigation.navigate('Detail', {
      id: id
    });
  };

  return (
    <View style={styles.screen}>
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

export default RecommendedScreen;
