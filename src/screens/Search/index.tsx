import React, { FC } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import CardImageWithTextOverlay from '../../components/GlobalComponents/CardImageWithTextOverlay';
import TransitionView from '../../components/GlobalComponents/TransitionView';
import SearchComponent from '../../components/SearchComponent';
import { hp } from '../../utils/responsive';
interface IProps {
};

const Search: FC<IProps> = (props) => {
  const { } = props;
  const _renderItem = (item: any, index?: number) => {
    return (
      <TransitionView
        index={index}
      >
        <CardImageWithTextOverlay
          _onPress={() => Alert.alert(`Test`)}
          titleOverlay={item.title}
          borderRadius={6}
          textPosition={'BottomLeft'}
          key={item.imgSrc}
          imageSource={item.imgSrc}
          height={85}
        />
      </TransitionView>
    );
  }

  const data = [
    { imgSrc: 'https://m.westay.vn/static/images/property/house.jpg', title: 'Full house' },
    { imgSrc: 'https://m.westay.vn/static/images/property/apartment.jpg', title: 'Apartment' },
    { imgSrc: 'https://m.westay.vn/static/images/property/villa.jpg', title: 'Villa' },
    { imgSrc: 'https://m.westay.vn/static/images/property/room.jpg', title: 'Private room' },
    { imgSrc: 'https://m.westay.vn/static/images/property/hotel.jpg', title: 'Hotel' },
    { imgSrc: 'https://m.westay.vn/static/images/property/studio.jpg', title: 'Studio' }
  ]
  return (
    <View style={{ marginTop: 50, height: hp('100%') }}>
      <View>
        <SearchComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

});
Search.defaultProps = {

}
export default Search;

