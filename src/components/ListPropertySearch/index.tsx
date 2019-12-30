import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import CardImageWithTextOverlay from '../GlobalComponents/CardImageWithTextOverlay';
import TransitionView from '../GlobalComponents/TransitionView';
import { getRoomType } from './ListPropertyContext';
import ListPropertySearch from './ListPropertySearch';
interface IProps { };

const ListSuggestion: FC<IProps> = (props) => {

  const [dataProperty, setDataProperty] = useState<Array<Object>>([]);
  const renderItemProperty = (item: any, index?: number) => {
    return (
      <TransitionView
        index={index}
      >
        <CardImageWithTextOverlay
          _onPress={() => Alert.alert(`${item.title}`)}
          titleOverlay={item.value}
          textPosition={'BottomLeft'}
          key={item.id}
          imageSource={item.imgSrc ? item.imgSrc : 'https://m.westay.vn/static/images/property/house.jpg'}
          height={85}
        />
      </TransitionView>
    );
  }

  useEffect(() => {
    getRoomType().then(res => {
      setDataProperty(res);
    })
  }, [])

  return (
    <ListPropertySearch
      title={'Ideas for you'}
      listData={dataProperty}
      renderItem={renderItemProperty}
    />
  );
};

const styles = StyleSheet.create({

});
ListSuggestion.defaultProps = {

}
export default ListSuggestion;
