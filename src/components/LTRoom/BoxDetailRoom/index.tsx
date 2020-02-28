import _ from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
import { hp, wp } from 'utils/responsive';
import BoxAmenitiesRoom from './BoxAmenitiesRoom';
import BoxBedAndGuest from './BoxBedAndGuest';
import BoxBookingRoom from './BoxBookingRoom';
import BoxCircleMapRoom from './BoxCircleMapRoom';
import BoxDescriptionRoom from './BoxDescriptionRoom';
import BoxImageDetail from './BoxImageDetail';
import BoxImageRoom from './BoxImageRoom';
import BoxIncludedFee from './BoxIncludedFee';
import BoxInfoHost from './BoxInfoHost';
import BoxInfoRoom from './BoxInfoRoom';
import BoxPriceLTRoom from './BoxPriceLTRoom';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

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
    <View style={{ backgroundColor: 'white' }}>
      <ScrollView style={{ marginBottom: 50, backgroundColor: 'white' }}>
        <View>
          <BoxImageRoom arrImages={mediaToTal} />
        </View>
        <View style={styles.container}>
          <BoxInfoRoom />
          <Divider style={{ backgroundColor: '#8AA9896d', marginVertical: 10 }} />
          <BoxInfoHost />
          <Divider style={{ backgroundColor: '#8AA9896d', marginVertical: 10 }} />
          <BoxBedAndGuest />
          <Divider style={{ backgroundColor: '#8AA9896d', marginVertical: 10 }} />
          <BoxDescriptionRoom />
          <Divider style={{ backgroundColor: '#8AA9896d', marginVertical: 10 }} />
          <BoxImageDetail arrImages={mediaToTal} />
          <Divider style={{ backgroundColor: '#8AA9896d', marginVertical: 10 }} />
          <BoxAmenitiesRoom />
        </View>
        <View>
          <BoxPriceLTRoom />
          <Divider style={{ backgroundColor: '#8AA9896d' }} />
          <BoxIncludedFee />
          <Divider style={{ backgroundColor: '#8AA9896d' }} />
        </View>

        <View>
          <BoxCircleMapRoom />
        </View>
      </ScrollView>
      <View>
        <BoxBookingRoom />
      </View>
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
