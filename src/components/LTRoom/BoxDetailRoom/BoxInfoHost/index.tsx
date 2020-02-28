import CardWithSideText from 'components/GlobalComponents/CardWithSideText';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_BLUR_TEXT, COLOR_TEXT_SUBTITLE, NORMAL, SEMI_BOLD } from 'styles/global.style';
/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxInfoHost: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.shopInfoContainer}>
          <CardWithSideText
            noAnimate
            // hasBadge
            rounded
            imageSource={listing.merchant.data.avatar_url}
            widthImage={48}
            hasVerified
            title={listing.merchant.data.name}
            subtitle={
              <View style={{ display: 'flex', alignItems: 'flex-start', backgroundColor: 'white', paddingTop: 4 }}>
                <View>
                  <Text style={styles.subtitleShopInfoText}>Listing: {listing.merchant.data.number_room}</Text>
                </View>
                {listing.merchant.data.city ? (

                  <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="ios-pin" size={11} style={{ paddingRight: 4, alignSelf: 'center' }} color={'#767676'} />
                    <Text style={styles.subtitleShopInfoText}> {listing.merchant.data.city}</Text>
                  </View>
                ) : null}
              </View>
            }
            rightInfo={
              <View style={{ borderWidth: 0.5, height: 28, paddingHorizontal: 8, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 360, borderColor: COLOR_TEXT_SUBTITLE }}>
                <Text>View Profile</Text>
              </View>
            }
          />
        </View>
        {/* <View style={styles.shopDetailContainer}>
          <View style={styles.detailItemContainer}>
            <View><Text style={styles.titleDetail}>{10}</Text></View>
            <View><Text style={styles.subtitleDetail}>Listing</Text></View>
          </View>
          <VerticalDivider />
          <View style={styles.detailItemContainer}>
            <View><Text style={styles.titleDetail}>{10}</Text></View>
            <View><Text style={styles.subtitleDetail}>Reviews</Text></View>
          </View>
          <VerticalDivider />
          <View style={[styles.detailItemContainer, { justifyContent: 'center' }]}>
            <View><Text style={[styles.subtitleDetail, { color: COLOR_URL_TEXT }]}>Verified</Text></View>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    // height: 130,
    // borderRadius: 4,
    // borderWidth: 0.5,
    // borderColor: '#7676764d',
  },
  shopInfoContainer: {
    justifyContent: 'center',
    flex: 1.5,
    display: 'flex',
    borderRadius: 4,
    backgroundColor: 'white'
  },
  shopDetailContainer: {
    flex: 1.2,
    borderRadius: 4,
    // backgroundColor: 'red',
    flexDirection: 'row'
  },
  detailItemContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1
  },
  titleDetail: {
    fontSize: 15,
    color: '#EC7371ED',
    fontWeight: SEMI_BOLD
  },
  subtitleDetail: {
    fontSize: 13,
    color: COLOR_TEXT_SUBTITLE,
    fontWeight: NORMAL
  },
  subtitleShopInfoText: {
    fontSize: 12,
    paddingVertical: 1,
    color: COLOR_BLUR_TEXT
  }
});
BoxInfoHost.defaultProps = {};
export default BoxInfoHost;
