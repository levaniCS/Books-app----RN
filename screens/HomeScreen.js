import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  YellowBox,
  View,
  Text,
  Button,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { SliderBox } from 'react-native-image-slider-box';
import Section from '../components/Section';
import BookList from '../components/BookList';

import Colors from '../constants/colors';
import SearchBar from '../components/SearchBar';
import { getDefaultBooks } from '../store/actions/books';

const HomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const data = useSelector((state) => state.books.booksData);
  const [images, setImages] = useState([
    'https://img1.looper.com/img/gallery/mistakes-that-are-hard-to-ignore-in-breaking-bad/intro-1582120892.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/02/digital/video/1600x1100/1600x1100_Lost._V326551087_SX1080_.jpg',
    'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/01/sons-of-anarchy-featured.jpg'
  ]);
  const dispatch = useDispatch();
  const dataVertical = data.slice(0, 5);

  const loadBooks = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(getDefaultBooks());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadBooks);

    return () => {
      willFocusSub.remove();
    };
  }, [loadBooks]);

  useEffect(() => {
    setIsLoading(true);
    loadBooks().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBooks]);

  const selectItemHandler = (id) => {
    props.navigation.navigate('Detail', {
      id: id
    });
  };

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested' // TODO: Remove when fixed
  ]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title='Try again' onPress={loadBooks} color={Colors.red} />
      </View>
    );
  }

  if (isLoading && !data.length > 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.red} />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={loadBooks} />
      }
      showsVerticalScrollIndicator={false}
      style={styles.screen}>
      <SearchBar navigation={props.navigation} />
      {data && data.length > 0 ? (
        <Section style={styles.sectionSt} title='Discover'>
          <SliderBox
            images={images}
            dotColor={Colors.red}
            inactiveDotColor={Colors.whiteLight}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 10
            }}
            style={styles.imgSlider}
          />
        </Section>
      ) : null}
      {data && data.length > 0 ? (
        <Section
          onMorePress={() => props.navigation.navigate('Popular')}
          style={styles.sectionSt}
          title='Popular'
          hasMore>
          <BookList
            scrollRoutate
            data={dataVertical}
            selectItemHandler={selectItemHandler}
          />
        </Section>
      ) : null}
      {data && data.length > 0 ? (
        <Section
          onMorePress={() => props.navigation.navigate('Recommended')}
          style={styles.sectionSt}
          title='Recommended'
          hasMore>
          <BookList data={data} selectItemHandler={selectItemHandler} />
        </Section>
      ) : null}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionSt: {
    overflow: 'hidden',
    borderRadius: 5
  },
  imgSlider: {
    width: '100%',
    height: 200
  }
});
