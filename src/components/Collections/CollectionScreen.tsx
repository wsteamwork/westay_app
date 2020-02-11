import React, {FC, memo} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  StatusBar,
  NativeModules,
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

  const renderNavBar = () => (
    <View style={[styles.navContainer, elevationShadowStyle(6)]}>
      <View style={styles.statusBar} />
      <View style={[styles.navBar]}>
        <TouchableWithScale _onPress={()=>navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="#000" />
        </TouchableWithScale>
      </View>
    </View>
  );

  const renderContent = () => (
    <View style={[styles.navContainer, {height:1000}]}>
      <ListCollectionsSquare title='Studio For Rent' typeData='studio_for_rent' />
    </View>
  );

  return (
    <View style={styles.container}>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT + STATUS_BAR_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        navbarColor="#fff"
        statusBarColor='transparent'
        title="Tên bộ sưu tập"
        titleStyle={styles.titleStyle}
        backgroundImage={images.background}
        backgroundImageScale={1.2}
        // alwaysShowNavBar={false}
        // alwaysShowTitle={false}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        // scrollViewProps={{
        //   onScrollBeginDrag: () => Alert.alert('onScrollBeginDrag'),
        //   onScrollEndDrag: () => Alert.alert('onScrollEndDrag'),
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
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
  },
});

export default compose(
  memo,
  withNavigation,
)(CollectionScreen);
