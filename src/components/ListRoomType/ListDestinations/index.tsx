import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DefaultSwiper from 'components/GlobalComponents/SnapCarouselRenderer/DefaultSwiper';
import DestinationCard from 'components/GlobalComponents/Cards/DestinationCard';
import {hp, wp} from 'utils/responsive';

interface IProps {

}

const ListDestinations: FC<IProps> = (props) => {
  const { } = props;

  const arrayData = [
    { id: 1, value: "Full House", image: 'https://m.westay.vn/static/images/property/house.jpg' },
    { id: 2, value: "Apartment", image: "https://m.westay.vn/static/images/property/apartment.jpg" },
    { id: 3, value: "Villa", image: "https://m.westay.vn/static/images/property/villa.jpg" },
    { id: 4, value: "Private Room", image: "https://m.westay.vn/static/images/property/room.jpg" },
    { id: 5, value: "Hotel", image: "https://m.westay.vn/static/images/property/hotels.jpg" },
    { id: 6, value: "Studio", image: "https://m.westay.vn/static/images/property/studio.jpg" }
  ];

  // @ts-ignore
  const _renderItem = ({item}) => {
    console.log(item);
    return (
      <View>
        <DestinationCard item={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DefaultSwiper
        _renderItem={_renderItem}
        dataSwiper={arrayData}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'red'
  },
});

export default ListDestinations;
