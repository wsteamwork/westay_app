import React, { FC, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity } from 'react-native';
import { wp, hp } from 'utils/responsive';
import BoxIntroRoom from './BoxIntroRoom';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { Dispatch } from 'redux';
import { LTRoomReducerAction, getDataLTRoom } from 'store/redux/reducers/LTRoom/RoomDetails';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
interface IProps extends NavigationInjectedProps{
  initialProps?: any;
}

const BoxImageLT: FC<IProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch<Dispatch<LTRoomReducerAction>>();
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  useEffect(() => {
    getDataLTRoom(3457, dispatch);
  }, []);
  console.log(listing);
  return (
    <View style={styles.container} collapsable={false}>
      <View style={styles.featureImage}>
        <View style={styles.btnBack}>
          <TouchableOpacity style={styles.bgIcon} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <ImageBackground
        source={{
          uri: `${IMAGE_STORAGE_LG + listing.avatar.images[0].name}`,
        }}
        style={{ width: '100%', height: '100%' }}>
        <BoxIntroRoom />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  featureImage: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('2%'),
    width: wp('100%'),
    height: hp('8%'),
    zIndex: 1
  },
  btnBack: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  bgIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    right: 0,
  },
});
BoxImageLT.defaultProps = {};
export default withNavigation(BoxImageLT);
