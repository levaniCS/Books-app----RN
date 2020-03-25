import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/colors';
import BookInfo from '../components/BookInfo';
import BookSee from '../components/BookSee';
import Section from '../components/Section';
import BookList from '../components/BookList';
import { toggleFavourite } from '../store/actions/books';

const DetailsScreen = (props) => {
  const BOOKS = useSelector((state) => state.books.booksData);
  const bookId = props.navigation.getParam('id');

  const dispatch = useDispatch();

  const selectedBook = BOOKS.find((book) => book.id === bookId);
  const dataVertical = BOOKS.slice(0, 9);

  const currentBookIsFavourite = useSelector((state) =>
    state.books.favouriteBooks.some((book) => book.id === bookId)
  );

  const showMore = (onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.moreLess}>Show More</Text>
      </TouchableOpacity>
    );
  };
  const showLess = (onPress) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.moreLess}>Show Less</Text>
      </TouchableOpacity>
    );
  };

  const selectItemHandler = (id) => {
    props.navigation.navigate('Detail', {
      id: id
    });
  };

  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(bookId));
  }, [dispatch, bookId]);

  const validDate = selectedBook.volumeInfo.publishedDate
    ? selectedBook.volumeInfo.publishedDate
    : '1998';
  const validAuthor = selectedBook.volumeInfo.authors
    ? selectedBook.volumeInfo.authors[0]
    : 'David Olivei';
  const validGenre = selectedBook.volumeInfo.categories
    ? selectedBook.volumeInfo.categories[0]
    : 'Drama';

  return (
    <ScrollView style={styles.screen}>
      <Image
        source={{ uri: selectedBook.volumeInfo.imageLinks.thumbnail }}
        style={styles.image}
        resizeMode='stretch'
      />
      <BookInfo
        toggleSave={toggleFavouriteHandler}
        isSaved={currentBookIsFavourite}
        date={validDate}
        author={validAuthor}
        genres={validGenre}
        title={selectedBook.volumeInfo.title}
      />
      <BookSee
        reviewUrl={selectedBook.volumeInfo.previewLink}
        volumeUrl={selectedBook.volumeInfo.canonicalVolumeLink}
        readUrl={selectedBook.accessInfo.webReaderLink}
      />
      <View style={styles.textBox}>
        <Text style={styles.header}>Description</Text>
        <ViewMoreText
          numberOfLines={4}
          renderViewMore={showMore}
          renderViewLess={showLess}>
          <Text style={styles.description}>
            {selectedBook.volumeInfo.description}
          </Text>
        </ViewMoreText>
      </View>
      <Section style={styles.sectionSt} title='Some Similar Books'>
        <BookList
          scrollRoutate
          data={dataVertical}
          selectItemHandler={selectItemHandler}
        />
      </Section>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  image: {
    flex: 1,
    width: '100%',
    height: 250
  },
  textBox: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10
  },
  moreLess: {
    color: '#7c7c7c',
    fontFamily: 'sansBold',
    textTransform: 'uppercase'
  },

  header: {
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 16,
    textAlign: 'left',
    color: '#7c7c7c',
    textTransform: 'uppercase',
    fontFamily: 'sansBold'
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.greyDark,
    fontFamily: 'roboto'
  },
  sectionSt: {
    margin: 10
  }
});
