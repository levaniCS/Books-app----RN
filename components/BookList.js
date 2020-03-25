import React from 'react';
import { FlatList } from 'react-native';
import BookItem from './BookItem';

const BookList = (props) => {
  const renderBookItem = (itemdata) => {
    return (
      <BookItem
        selectItemHandler={props.selectItemHandler}
        routateMode={props.scrollRoutate}
        author={itemdata.item.volumeInfo.authors}
        id={itemdata.item.id}
        imageSrc={itemdata.item.volumeInfo.imageLinks.smallThumbnail}
        header={itemdata.item.volumeInfo.title}
        description={itemdata.item.volumeInfo.description}
      />
    );
  };

  return (
    <FlatList
      horizontal={props.scrollRoutate ? true : false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => item.id.toString()}
      data={props.data}
      renderItem={renderBookItem}
    />
  );
};

export default BookList;
