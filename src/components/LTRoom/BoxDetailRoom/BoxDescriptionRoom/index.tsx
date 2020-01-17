import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

interface IProps {
  initialProps?: any;
}

const BoxDescriptionRoom: FC<IProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>Thông tin căn hộ</Text>
      <Text style={styles.txtDescription}>
        Artemis Luxury Apartment - Căn hộ chung cư cao cấp tại số 3 Lê Trọng Tấn, quận Thanh
        Xuân.Căn hộ cao cấp Artemis - tọa lạc tại vị trí được ví như "trái tim của thủ đô" giao thoa
        giữa 2 quận Đống Đa, Thanh Xuân.Artemis là một khu phức hợp với đầy đủ những tiện ích khép
        kín, hứa hẹn mang tới cho cư dân cuộc sống hoàn hảo thực sự đẳng cấp Có trung tâm thương mại
        thuận tiện cho giải trí mua sắm,siêu thị BigC, rạp chiếu phim CGV, các nhà hàng ăn uống. Có
        hầm gửi xe.
      </Text>
      <Text style={styles.txtDescription}>
        Artemis Luxury Apartment - Căn hộ chung cư cao cấp tại số 3 Lê Trọng Tấn, quận Thanh
        Xuân.Căn hộ cao cấp Artemis - tọa lạc tại vị trí được ví như "trái tim của thủ đô" giao thoa
        giữa 2 quận Đống Đa, Thanh Xuân.Artemis là một khu phức hợp với đầy đủ những tiện ích khép
        kín, hứa hẹn mang tới cho cư dân cuộc sống hoàn hảo thực sự đẳng cấp Có trung tâm thương mại
        thuận tiện cho giải trí mua sắm,siêu thị BigC, rạp chiếu phim CGV, các nhà hàng ăn uống. Có
        hầm gửi xe.
      </Text>
      <Text style={styles.txtDescription}>
        Artemis Luxury Apartment - Căn hộ chung cư cao cấp tại số 3 Lê Trọng Tấn, quận Thanh
        Xuân.Căn hộ cao cấp Artemis - tọa lạc tại vị trí được ví như "trái tim của thủ đô" giao thoa
        giữa 2 quận Đống Đa, Thanh Xuân.Artemis là một khu phức hợp với đầy đủ những tiện ích khép
        kín, hứa hẹn mang tới cho cư dân cuộc sống hoàn hảo thực sự đẳng cấp Có trung tâm thương mại
        thuận tiện cho giải trí mua sắm,siêu thị BigC, rạp chiếu phim CGV, các nhà hàng ăn uống. Có
        hầm gửi xe.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  txtTitle: {
    fontSize: 24,
    marginBottom: hp('2%'),
    fontWeight: '700',
  },
  txtDescription: {
    fontSize: 15,
    fontWeight: '500',
    color: '#484848',
    letterSpacing: 0.6,
    marginBottom: hp('2%')
  }
});
BoxDescriptionRoom.defaultProps = {};
export default BoxDescriptionRoom;
