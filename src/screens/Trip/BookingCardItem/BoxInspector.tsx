import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { hp } from 'utils/responsive';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  booking: any;
}

const BoxInspector: FC<IProps> = (props) => {
  const { navigation, booking } = props;
  return (
    <View style={styles.container}>
      <View style={styles.boxText}>
        <Text style={styles.title}>
          Bạn vui lòng đánh giá trải nghiệm trong quá trình sử dụng căn hộ
        </Text>
      </View>
      <View>
        <Button
          title="Đánh giá"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => {
            navigation.navigate('BoxChooseInspectorType', { bookingInfo: booking });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxText: {
    width: hp('35%'),
  },
  title: {
    color: '#484848',
    fontWeight: '700',
  },
  titleStyle: {
    fontSize: 14,
    marginBottom: 3,
  },
  buttonStyle: {
    height: hp('4.5%'),
    backgroundColor: '#008489',
  },
});
export default withNavigation(BoxInspector);
