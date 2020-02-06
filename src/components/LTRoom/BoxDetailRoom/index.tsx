import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Platform } from 'react-native';
import { wp, hp } from 'utils/responsive';
import BoxInfoRoom from './BoxInfoRoom';
import { Divider } from 'react-native-elements';
import BoxInfoHost from './BoxInfoHost';
import BoxBedAndGuest from './BoxBedAndGuest';
import BoxDescriptionRoom from './BoxDescriptionRoom';
import BoxAmenitiesRoom from './BoxAmenitiesRoom';
import BoxImageRoom from './BoxImageRoom';
import BoxCircleMapRoom from './BoxCircleMapRoom';
import BoxPriceLTRoom from './BoxPriceLTRoom';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import BoxImageDetail from './BoxImageDetail';
import BoxIncludedFee from './BoxIncludedFee';
import BoxBookingRoom from './BoxBookingRoom';
import { ReducersList } from 'store/redux/reducers';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
import _ from 'lodash';

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxDetailRoom: FC<IProps> = (props) => {
  const [mediaToTal, setMediaToTal] = useState<any>([]);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  useEffect(() => {
    let arrayImg: any = [];
    if (listing.avatar.images.length) {
      arrayImg.push(...listing.avatar.images);
    }
    if (listing.cover_photo.images.length) {
      arrayImg.push(...listing.cover_photo.images);
    }
    if (listing.bedrooms.number_bedroom) {
      {
        _.times(listing.bedrooms.number_bedroom, (i) =>
          arrayImg.push(...listing.bedrooms[`bedroom_${i + 1}`].images),
        );
      }
    }
    if (listing.bathrooms.total_image) {
      {
        _.times(listing.bathrooms.number_bathroom, (i) =>
          arrayImg.push(...listing.bathrooms[`bathroom_${i + 1}`].images),
        );
      }
    }
    if (listing.outdoors.images.length) {
      arrayImg.push(...listing.outdoors.images);
    }
    if (listing.furnitures.images.length) {
      arrayImg.push(...listing.furnitures.images);
    }
    if (listing.kitchens.images.length) {
      arrayImg.push(...listing.kitchens.images);
    }
    if (listing.livingrooms.images.length) {
      arrayImg.push(...listing.livingrooms.images);
    }
    let images = arrayImg
      ? _.map(arrayImg, (o, i) => {
          return {
            url: `${IMAGE_STORAGE_LG + arrayImg[i].name}`,
            width: wp('100%'),
            height: hp('50%'),
          };
        })
      : [];
      setMediaToTal(images);
  }, []);
  return (
    <View>
      <ScrollView style={{ marginBottom: hp('8%') }}>
        <View>
          <BoxImageRoom arrImages={mediaToTal}/>
        </View>
        <View style={styles.container}>
          <BoxInfoRoom />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxInfoHost />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxBedAndGuest />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxDescriptionRoom />
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxImageDetail arrImages={mediaToTal}/>
          <Divider style={{ backgroundColor: '#bcbcbc', marginVertical: hp('2%') }} />
          <BoxAmenitiesRoom />
        </View>
        <View>
          <BoxCircleMapRoom />
        </View>
        <View>
          <BoxPriceLTRoom />
          <Divider style={{ backgroundColor: '#bcbcbc' }} />
          <BoxIncludedFee />
          <Divider style={{ backgroundColor: '#bcbcbc' }} />
        </View>
      </ScrollView>
      <BoxBookingRoom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: wp('4%'),
    width: wp('100%'),
  },
});
BoxDetailRoom.defaultProps = {};
export default withNavigation(BoxDetailRoom);
