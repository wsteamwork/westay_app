import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { hp } from 'components/Utils/responsive.style';
import React, { FC, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_TEXT_TITLE, SIZE_TEXT_SUBTITLE, SIZE_TEXT_TITLE, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { wp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxIncludedFee: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const [collapsedServices, setCollapsedServices] = useState(false);
  return (
    <View>
      <TouchableWithoutFeedback style={styles.touchable} onPress={() => setCollapsedServices(true)}>
        <View style={styles.container}>
          <Text style={styles.title}>Service fees</Text>
          <Entypo name="chevron-right" size={25} color="#adadad" />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => setCollapsedServices(false)}
        visible={collapsedServices}>
        <HeaderWithBackTitle
          handlePress={() => setCollapsedServices(false)}
          containerStyle={{ marginTop: hp('5%') }}
        />
        <ScrollView>
          <Text style={styles.textHeader}>Service fees</Text>
          {listing.prices.included_fee && listing.prices.included_fee.length ? (
            listing.prices.included_fee.map((o: any, i: number) =>
              o.included == 1 ? (
                <View style={styles.boxContainer} key={i}>
                  <View key={i} style={styles.boxPrice}>
                    <Text style={styles.txtTerm}>{o.name}</Text>
                    <Text style={styles.price}>Fee included in rent price</Text>
                  </View>
                  <Divider style={styles.divider} />
                </View>
              ) : (
                  <View style={styles.boxContainer} key={i}>
                    <View key={i} style={styles.boxPrice}>
                      <Text style={styles.txtTerm}>{o.name}</Text>
                      <Text style={styles.price}>
                        {o.calculate_function == 3 || o.calculate_function == 6
                          ? `${o.calculate_function_txt}`
                          : `$${o.value} ${o.calculate_function_txt}`}
                      </Text>
                    </View>
                    <Divider style={styles.divider} />
                  </View>
                ),
            )
          ) : (
              <Text></Text>
            )}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  boxContainer: {
    flexDirection: 'column',
  },
  boxPrice: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginVertical: hp('2%'),
    flex: 1,
  },
  touchable: {
    width: wp('100%'),
    height: hp('100%'),
  },
  textHeader: {
    paddingHorizontal: wp('4%'),
    fontSize: SIZE_TEXT_TITLE,
    fontWeight: '500',
    marginBottom: hp('2%'),
  },
  txtTerm: {
    fontSize: SIZE_TEXT_TITLE_MEDIUM,
    width: wp('70%'),
    color: '#484848',
  },
  price: {
    alignItems: 'flex-start',
    fontSize: SIZE_TEXT_SUBTITLE,
    marginTop: 4,
    fontWeight: '500',
  },
  title: {
    // justifyContent: 'center',
    fontSize: SIZE_TEXT_TITLE,
    // marginBottom: hp('2%'),
    fontWeight: '600',
    color: COLOR_TEXT_TITLE,
  },
  divider: {
    backgroundColor: '#bcbcbc',
    paddingHorizontal: wp('4%'),
    marginVertical: hp('1%'),
  },
});
BoxIncludedFee.defaultProps = {};
export default BoxIncludedFee;
