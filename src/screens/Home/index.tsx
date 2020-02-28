import ContactButton from 'components/ContactButton';
import CollectionsRectangleCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsRectangleCard';
import DestinationCard from 'components/GlobalComponents/Cards/DestinationCard';
import ValuableCard from 'components/GlobalComponents/Cards/ValuableCard';
import ListRoomType from 'components/ListRoomType';
import ListCollections from 'components/ListRoomType/ListCollections';
import ListCollectionsSquare from 'components/ListRoomType/ListCollectionsSquare';
import ListDestinations from 'components/ListRoomType/ListDestinations_Valuable';
import InputSearchFake from 'components/SearchComponent/InputSearchFake';
import React, { Dispatch, FC, useContext, useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RNBootSplash from "react-native-bootsplash";
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'store/context/auth';
import { getHomePageCollection } from 'store/Hooks/CardRoomHooks';
import { ReducersActions, ReducersList } from 'store/redux/reducers';
import { getRoomsHomepage } from 'store/redux/reducers/Home/roomHomepage';
import { IMAGE_NOT_FOUND, IMAGE_STORAGE_SM } from 'types/globalTypes';
import { IDataCollections } from 'types/Rooms/RoomRequests';
import { NumberRoomCity } from 'types/Rooms/RoomResponses';
import { axios } from 'utils/api';
import { __currentPlatform } from 'utils/mixins';
import { hp, wp } from 'utils/responsive';

const Home: FC = (props) => {
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  const dispatchHome = useDispatch<Dispatch<ReducersActions>>();
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const [editorChoice, setEditorChoice] = useState<IDataCollections>({ data: [], meta: 0 });
  const [forFamily, setForFamily] = useState<IDataCollections>({ data: [], meta: 0 });
  const [goodPrice, setGoodPrice] = useState<[]>([]);
  const [dataTypeHouse, setDataTypeHouse] = useState<[]>([]);

  const getDataTypeHouse = async () => {
    const response = await axios.get('rooms/room-type-homepage', { headers: { 'Accept-Language': languageStatus } });
    setDataTypeHouse(response.data.data);
  };

  let init = async () => {
    await getDataTypeHouse();
    await getRoomsHomepage(dispatchHome, languageStatus);
  };

  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({ duration: 250 });
    });

  }, [languageStatus]);

  useEffect(() => {
    getHomePageCollection('editor_choice', 8).then((res) => {
      setEditorChoice({
        data: res.data.data,
        meta: res.data!.meta!.pagination!.total
      })
    });
    getHomePageCollection('for_family', 8).then((res) => {
      setForFamily({
        data: res.data.data,
        meta: res.data!.meta!.pagination!.total
      })
    });
    getHomePageCollection('good_price', 8).then((res) => setGoodPrice(res.data.data));
  }, []);


  const _renderEditorChoice = (item: any, index: number) => {
    return (
      <View style={{ paddingRight: wp('2%') }} key={index}>
        <CollectionsRectangleCard room={item} />
      </View>
    );
  };

  const _renderForFamily = (item: any, index: number) => {
    return (
      <View style={{ paddingRight: wp('2%') }} key={index}>
        <CollectionsRectangleCard room={item} showNumberRoom />
      </View>
    );
  };

  const _renderDestination = (item: NumberRoomCity, index: number) => {
    return (
      <View key={index} style={{ maxHeight: 220 }}>
        <DestinationCard item={item} />
      </View>
    );
  };

  const _renderValuableRoom = (room: any, index: number) => {
    const imgRoomSM = room.avatar.images && room.avatar.images.length
      ? `${IMAGE_STORAGE_SM + room.avatar.images[0].name}`
      : IMAGE_NOT_FOUND;
    return (
      <View key={index}>
        <ValuableCard city={room.city}
          district={room.district}
          priceDisplay={room.price_display}
          roomID={room.id}
          roomName={room.about_room.name}
          roomType={room.accommodation_type_txt}
          roomImage={imgRoomSM}
          avg_rating={room.avg_rating} />
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" style={{ flex: 1, backgroundColor: '#fff' }} useNativeDriver>
      <StatusBar
        translucent={false}
        barStyle={'dark-content'}
        backgroundColor="#fff"
        animated={true}
      />
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View style={styles.searchComponent}>
          <InputSearchFake />
        </View>

        <View style={[styles.pdLeft, { paddingLeft: wp('0%'), paddingTop: 8 }]}>
          <ListRoomType data={dataTypeHouse} />
        </View>

        <View style={styles.mrTop}>
          <ListDestinations data={roomsCity} title='Top Destinations' _renderItem={_renderDestination} />
        </View>

        <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
          <ListCollections data={editorChoice.data} typeData='editor_choice' total={editorChoice.meta} title='Editor Choice' _renderItem={_renderEditorChoice} />
        </View>

        <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
          <ListCollections data={forFamily.data} typeData='for_family' total={forFamily.meta} title='For Family' _renderItem={_renderForFamily} />
        </View>

        <View style={[styles.pdLeft, { marginTop: hp('1%') }]}>
          <ListCollectionsSquare title='Studio For Rent' typeData='studio_for_rent' />
        </View>

        <View style={styles.mrTop}>
          <ListDestinations data={goodPrice} title='Valuable Room' _renderItem={_renderValuableRoom} />
        </View>
        <View style={styles.boxEmpty} />
      </ScrollView>

      <ContactButton />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:StatusBar.currentHeight,
  },
  pdLeft: {
    paddingLeft: wp('5%'),
    marginBottom: hp('1.5%'),
    marginTop: __currentPlatform ? StatusBar.currentHeight : 38
  },
  mrTop: {
    // marginVertical: hp('1.5%')
    marginVertical: 4
  },
  boxEmpty: {
    height: hp('5%')
  },
  searchComponent: {
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
  }
});

export default Home;
