import CollectionsRectangleCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsRectangleCard';
import DestinationCard from 'components/GlobalComponents/Cards/DestinationCard';
import ValuableCard from 'components/GlobalComponents/Cards/ValuableCard';
import ListRoomType from 'components/ListRoomType';
import ListCollections from 'components/ListRoomType/ListCollections';
import ListCollectionsSquare from 'components/ListRoomType/ListCollectionsSquare';
import ListDestinations from 'components/ListRoomType/ListDestinations_Valuable';
import React, { FC } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { TypeApartment } from 'types/Rooms/RoomResponses';
import { __currentPlatform } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';

interface IProps {
  initialProps?: any;
};

const Home: FC<IProps> = (props) => {
  const { initialProps } = props;

  const _renderEditorChoice = (item: TypeApartment, index: number) => {
    return (
      <View style={{ paddingRight: wp('2%') }} key={index}>
        <CollectionsRectangleCard item={item} />
      </View>
    );
  };

  const _renderForFamily = (item: TypeApartment, index: number) => {
    return (
      <View style={{ paddingRight: wp('2%') }} key={index}>
        <CollectionsRectangleCard item={item} showNumberRoom />
      </View>
    );
  };

  const _renderDestination = (item: TypeApartment, index: number) => {
    return (
      <View key={index}>
        <DestinationCard item={item} />
      </View>
    );
  };

  // const _renderValuableRoom = (item: TypeApartment, index: number) => {
  //   return (
  //     <View key={index}>
  //       <ValuableCard item={item} />
  //     </View>
  //   );
  // };

  const dataDemo = [
    { id: 1, value: "Full House", image: 'https://m.westay.vn/static/images/property/house.jpg' },
    { id: 2, value: "Apartment", image: "https://m.westay.vn/static/images/property/apartment.jpg" },
    { id: 3, value: "Villa", image: "https://m.westay.vn/static/images/property/villa.jpg" },
    { id: 4, value: "Private Room", image: "https://m.westay.vn/static/images/property/room.jpg" },
    { id: 5, value: "Hotel", image: "https://m.westay.vn/static/images/property/hotels.jpg" },
    { id: 6, value: "Studio", image: "https://m.westay.vn/static/images/property/studio.jpg" }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.pdLeft, { marginLeft: -wp('5%') }]}>
        <ListRoomType data={dataDemo} />
      </View>

      <View style={styles.mrTop}>
        <ListDestinations data={dataDemo} title='Top Destinations' _renderItem={_renderDestination} />
      </View>

      <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
        <ListCollections data={dataDemo} title='Editor Choice' _renderItem={_renderEditorChoice} />
      </View>

      <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
        <ListCollections data={dataDemo} title='For Family' _renderItem={_renderForFamily} />
      </View>

      <View style={[styles.pdLeft, { marginTop: hp('1%') }]}>
        <ListCollectionsSquare title='Studio For Rent' typeData='studio_for_rent' />
      </View>

      {/*<View style={styles.mrTop}>*/}
      {/*  <ListDestinations data={dataDemo} title='Valuable Room' _renderItem={_renderValuableRoom} />*/}
      {/*</View>*/}
      <View style={styles.boxEmpty} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pdLeft: {
    paddingLeft: wp('5%'),
    // marginTop: hp('3%')
    marginBottom: hp('1.5%'),
    marginTop: __currentPlatform ? StatusBar.currentHeight : 38
  },
  mrTop: {
    marginVertical: hp('1.5%')
  },
  boxEmpty: {
    height: hp('8%')
  }
});

export default Home;
