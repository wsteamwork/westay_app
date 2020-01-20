import React, { FC, useState } from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Modal } from 'react-native';
import { wp } from 'utils/responsive';
import { Text, Divider } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { hp } from 'components/Utils/responsive.style';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
interface IProps {
  initialProps?: any;
}

const BoxIncludedFee: FC<IProps> = (props) => {
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const [collapsedServices, setCollapsedServices] = useState(false);
  console.log(listing);
  return (
    <View>
      <TouchableNativeFeedback style={styles.touchable} onPress={() => setCollapsedServices(true)}>
        <View style={styles.container}>
          <Text style={styles.title}>Service fees</Text>
          <Entypo name="chevron-right" size={25} color="#adadad" />
        </View>
      </TouchableNativeFeedback>
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={() => setCollapsedServices(false)}
        visible={collapsedServices}>
        <HeaderWithBackTitle
          handlePress={() => setCollapsedServices(false)}
          containerStyle={{ paddingTop: hp('3%') }}
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
    fontSize: 20,
    fontWeight: '700',
    marginBottom: hp('2%'),
},
txtTerm: {
    fontSize: 16,
    width: wp('50%'),
    color: '#484848',
    marginBottom: hp('1%'),
  },
  price: {
    alignItems: 'flex-start',
    fontSize: 18,
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
BoxIncludedFee.defaultProps = {};
export default BoxIncludedFee;
