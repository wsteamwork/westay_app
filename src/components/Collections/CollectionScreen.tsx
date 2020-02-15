import React, {FC, memo, useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  StatusBar,
  NativeModules, ScrollView, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {hp, wp} from 'utils/responsive';
import {elevationShadowStyle} from 'utils/mixins';
import {SIZE_TEXT_TITLE} from 'styles/global.style';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
// @ts-ignore
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import ListCollectionsSquare from 'components/ListRoomType/ListCollectionsSquare';
import {IDataCollections} from 'types/Rooms/RoomRequests';
import {getHomePageCollection} from 'store/Hooks/CardRoomHooks';
import CollectionsSquareCard from 'components/GlobalComponents/Cards/CollectionsCard/CollectionsSquareCard';
import {TypeApartment} from 'types/Rooms/RoomResponses';
import RoomTypeCard from 'components/GlobalComponents/Cards/RoomTypeCard';

const { StatusBarManager } = NativeModules;
const {
        height: SCREEN_HEIGHT,
      } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT  === 812 || SCREEN_HEIGHT  === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : StatusBarManager.HEIGHT;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require('../../assets/images/images_web/background_sea.jpg'), // Put your own image here
};

interface IProps extends NavigationInjectedProps{

}

const CollectionScreen: FC<IProps> = (props) => {
  const { navigation } = props;
  const [dataRooms, setDataRooms] = useState<IDataCollections>({data: [], meta: 0});

  const typeData = navigation.getParam('typeDataCollection');
  const title = navigation.getParam('titleCollection');

  useEffect(() => {
    getHomePageCollection(typeData, 30).then((res) => setDataRooms({data: res.data.data, meta: res.data.meta!.pagination.total}));
  }, []);

  const _renderItem = (item: any, index: number) => {
    return (
      <View style={{ flex: 1 }} key={index}>
        <CollectionsSquareCard room={item} />
      </View>
    );
  };

  const renderNavBar = () => (
    <View style={[styles.navContainer, elevationShadowStyle(6)]}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor="#fff"
        animated={true}
      />
      <View style={styles.statusBar} />
      <View style={[styles.navBar]}>
        <TouchableWithScale _onPress={()=>navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableWithScale>
      </View>
    </View>
  );

  const renderContent = () => (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={dataRooms.data}
      renderItem={({ item, index }) => _renderItem(item, index)}
      extraData={dataRooms.data}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.bodyContainer}
    />

    // <ScrollView style={styles.bodyContainer}>
    //   {dataRooms.data.map((room, i) => (
    //     <View key={i} style={{backgroundColor: 'blue', marginVertical: 10, width: '100%'}}>
    //       <CollectionsSquareCard room={room} />
    //     </View>
    //   ))}
    // </ScrollView>
  );

  return (
    <View style={styles.container}>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT + STATUS_BAR_HEIGHT}
        headerMaxHeight={hp('25%')}
        extraScrollHeight={20}
        navbarColor="#fff"
        statusBarColor='transparent'
        title={title}
        titleStyle={styles.titleStyle}
        backgroundImage={images.background}
        backgroundImageScale={1.2}
        // alwaysShowNavBar={false}
        // alwaysShowTitle={false}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        // contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          showsVerticalScrollIndicator: false
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // contentContainer: {
  //   flexGrow: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   paddingHorizontal: wp('5%'),
  //   paddingVertical: hp('5%'),
  //   backgroundColor: 'red',
  // },
  bodyContainer:{
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('5%'),
    justifyContent: 'space-between',
  },
  navContainer: {
    height: HEADER_HEIGHT + STATUS_BAR_HEIGHT,
    paddingHorizontal: wp('5%')
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  navBar: {
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  titleStyle: {
    marginTop: STATUS_BAR_HEIGHT,
    color: '#000',
    fontWeight: 'bold',
    fontSize: SIZE_TEXT_TITLE,
    width: wp('80%')
  },
});

export default compose(
  memo,
  withNavigation,
)(CollectionScreen);
