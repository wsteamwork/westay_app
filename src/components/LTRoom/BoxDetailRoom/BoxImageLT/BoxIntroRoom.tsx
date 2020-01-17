import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { PricingCard } from 'react-native-elements';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import Icon from 'react-native-vector-icons/Feather';
interface IProps {
  initialProps?: any;
}

const BoxIntroRoom: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <PricingCard
        color="rgb(84, 211, 194)"
        title="Spring Truc Bach Homestay"
        price="35.000.000đ"
        info={['1 Tháng', 'Quận Ba Đình, Hà Nội']}
        button={{ title: 'Kiểm tra lịch', icon: '', buttonStyle: styles.buttonStyle }}
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
        pricingStyle={styles.pricingStyle}
      />
      <ButtonOriginal
        title="Xem chi tiết"
        iconRight={true}
        icon={<Icon name="chevrons-down" size={19} color="white" />}
        useViewComponent={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    position:'absolute',
    bottom: 30
  },
  containerStyle: {
    borderRadius: 25,
  },
  buttonStyle: {
    borderRadius: 25,
    width: wp('85%'),
    height: hp('7%'),
  },
  titleStyle: {
    fontSize: wp('6%'),
  },
  pricingStyle: {
    fontSize: wp('8%'),
  },
});
BoxIntroRoom.defaultProps = {};
export default BoxIntroRoom;
