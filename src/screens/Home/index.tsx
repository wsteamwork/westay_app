import CollectionsRectangleCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsRectangleCard';
import DestinationCard from 'components/GlobalComponents/Cards/DestinationCard';
import ValuableCard from 'components/GlobalComponents/Cards/ValuableCard';
import ListRoomType from 'components/ListRoomType';
import ListCollections from 'components/ListRoomType/ListCollections';
import ListCollectionsSquare from 'components/ListRoomType/ListCollectionsSquare';
import ListDestinations from 'components/ListRoomType/ListDestinations_Valuable';
import React, {FC, useContext, useEffect, Dispatch, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {NumberRoomCity} from 'types/Rooms/RoomResponses';
import {__currentPlatform} from 'utils/mixins';
import {hp, wp} from 'utils/responsive';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList, ReducersActions} from 'store/redux/reducers';
import {AuthContext} from 'store/context/auth';
import {getRoomsHomepage} from 'store/redux/reducers/Home/roomHomepage';
import {getHomePageCollection} from 'store/Hooks/CardRoomHooks';
import {IMAGE_STORAGE_SM, IMAGE_NOT_FOUND} from 'types/globalTypes';
import InputSearchFake from 'components/SearchComponent/InputSearchFake';
import {axios} from 'utils/api';
import * as Animatable from 'react-native-animatable';
import ContactButton from 'components/ContactButton';
import {IDataCollections} from 'types/Rooms/RoomRequests';

const Home: FC = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const { token, languageStatus } = state;
  const dispatchHome = useDispatch<Dispatch<ReducersActions>>();
  const roomsCity = useSelector<ReducersList, NumberRoomCity[]>(
    (state) => state.roomHomepage.roomsCity
  );
  const [editorChoice, setEditorChoice] = useState<IDataCollections>({data: [], meta: 0});
  const [forFamily, setForFamily] = useState<IDataCollections>({data: [], meta: 0});
  const [goodPrice, setGoodPrice] = useState<[]>([]);
  const [dataTypeHouse, setDataTypeHouse] = useState<[]>([]);

  const getDataTypeHouse = async () => {
    const response = await axios.get('rooms/room-type-homepage', { headers: { 'Accept-Language': languageStatus } });
    setDataTypeHouse(response.data.data);
  };

  useEffect(() => {
    getRoomsHomepage(dispatchHome, languageStatus);
    getHomePageCollection('editor_choice').then((res) => {
      setEditorChoice({
        data: res.data.data,
        meta: res.data.data.length})
    });
    getHomePageCollection('for_family').then((res) => {
      setForFamily({
        data: res.data.data,
        meta: res.data.data.length})
    });
    getHomePageCollection('good_price', 8).then((res) => setGoodPrice(res.data.data));
    getDataTypeHouse();
  }, [languageStatus]);


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
      <View key={index}>
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
                      avg_rating={room.avg_rating}/>
      </View>
    );
  };

  return (
    <Animatable.View animation="fadeInUp" style={{ flex: 1 }} useNativeDriver>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor="transparent"
        animated={true}
      />
      <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
        <View style={styles.searchComponent}>
          <InputSearchFake />
        </View>

        <View style={[styles.pdLeft,{ paddingLeft: wp('0%')}]}>
          <ListRoomType data={dataTypeHouse} />
        </View>

        <View style={styles.mrTop}>
          <ListDestinations data={roomsCity} title='Top Destinations' _renderItem={_renderDestination} />
        </View>

        <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
          <ListCollections data={editorChoice.data} total={editorChoice.meta} title='Editor Choice' _renderItem={_renderEditorChoice} />
        </View>

        <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
          <ListCollections data={forFamily.data} total={forFamily.meta} title='For Family' _renderItem={_renderForFamily} />
        </View>

        <View style={[styles.pdLeft, { marginTop: hp('1%') }]}>
          <ListCollectionsSquare title='Studio For Rent' typeData='studio_for_rent' />
        </View>

        <View style={styles.mrTop}>
          <ListDestinations data={goodPrice} title='Valuable Room' _renderItem={_renderValuableRoom} />
        </View>
        <View style={styles.boxEmpty} />
      </ScrollView>

      <ContactButton/>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:StatusBar.currentHeight,
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
    height: hp('5%')
  },
  searchComponent: {
    // marginTop:StatusBar.currentHeight,
    paddingBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
    // backgroundColor: '#fff'
  }
});

export default Home;
