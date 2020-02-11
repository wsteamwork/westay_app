import React, { FC, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxCustomerInformation: FC<IProps> = (props) => {
  const { navigation } = props;
  useEffect(() => {}, []);
  const handleBooking = () => {};
  return (
    <View>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView style={{ marginBottom: hp('10%') }}>
          <HeaderWithBackTitle
            handlePress={() => navigation.goBack()}
            title="Customer Information"
          />
        </ScrollView>
      </View>
      <View style={styles.boxPrice}>
        <ButtonOriginal
          title="Pay now"
          handlePress={handleBooking}
          customStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

BoxCustomerInformation.defaultProps = {};
const styles = StyleSheet.create({
  boxPrice: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  buttonStyle: {
    borderRadius: 5,
    elevation: 3,
  },
  titleStyle: {
    color: 'red',
    fontWeight: '500',
    marginRight: 3,
  },
});
export default withNavigation(BoxCustomerInformation);
