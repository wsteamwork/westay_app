import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { hp } from 'components/Utils/responsive.style';
import React, { FC, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { wp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxPriceLTRoom: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const [collapsedPrice, setCollapsedPrice] = useState(false);
  return (
    <View>
      <TouchableNativeFeedback style={styles.touchable} onPress={() => setCollapsedPrice(true)}>
        <View style={styles.container}>
          <Text style={styles.title}>Price by lease term</Text>
          <Entypo name="chevron-right" size={25} color="#adadad" />
        </View>
      </TouchableNativeFeedback>
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => setCollapsedPrice(false)}
        visible={collapsedPrice}>
        <HeaderWithBackTitle
          handlePress={() => setCollapsedPrice(false)}
          containerStyle={{ paddingTop: hp('3%') }}
        />
        <ScrollView>
          <Text style={styles.textHeader}>Price by lease term</Text>
          {listing.prices && listing.prices.prices.length
            ? listing.prices.prices.map((o: any, i: number) => (
              <View key={i} style={styles.boxContainer}>
                <View style={styles.boxPrice}>
                  <Text style={styles.txtTerm}>{o.term}</Text>
                  <Text style={styles.price}> ${o.price}</Text>
                </View>
                <Divider style={styles.divider} />
              </View>
            ))
            : ''}
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: hp('2%'),
  },
  txtTerm: {
    fontSize: 16,
    width: wp('70%'),
    color: '#484848',
  },
  price: {
    alignItems: 'flex-start',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  divider: {
    backgroundColor: '#bcbcbc',
    paddingHorizontal: wp('4%'),
    marginVertical: hp('1%'),
  },
});
BoxPriceLTRoom.defaultProps = {};
export default BoxPriceLTRoom;
