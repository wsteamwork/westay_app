import React, { FC, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Divider } from 'react-native-elements';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import ChooseRentType from 'components/Host/CreateListingLayout/ChooseRentType';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import ChooseRoomType from 'components/Host/CreateListingLayout/ChooseRoomType';
import InputMerchant from 'components/InputMerchant';
import StayWithCustomer from 'components/Host/CreateListingLayout/StayWithCustomer';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { wp, hp } from 'utils/responsive';


/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const RoomInfomationBasic: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [modalRoomType, setModalRoomType] = useState<boolean>(false);
  const [showAction, setShowAction] = useState<boolean>(true);
  return (
    <SafeAreaView style={styles.container}>
      <CreateListingLayout
        titleHeader={'Bước 1 - Thông tin cơ bản'}
        titleMain={'Thông tin cơ bản căn hộ'}
        showBtnBack={true}
        showAction={showAction}>
        <View style={styles.boxRow}>
          <Text style={styles.labelChooseRentType}>Chọn hình thức cho thuê</Text>
          <ChooseRentType />
        </View>
        <TouchableWithScale
          style={styles.touchable}
          _onPress={() => setModalRoomType(!modalRoomType)}>
          <View style={styles.boxRow}>
            <Text style={styles.labelChooseType}>Loại căn hộ</Text>
            <ChooseRoomType />
            <Divider style={styles.divider} />
          </View>
        </TouchableWithScale>
        <View style={styles.boxRow}>
          <InputMerchant
            label={'Tổng diện tích'}
            inputAdornedEnd={'m2'}
            onFocus={() => setShowAction(false)}
            onSubmitEditing={() => setShowAction(true)}
            onBlur={() => setShowAction(true)}
          />
        </View>
        <View style={styles.boxRow}>
          <InputMerchant
            label={'Số phòng có thông tin tương tự'}
            onFocus={() => setShowAction(false)}
            onSubmitEditing={() => setShowAction(true)}
            onBlur={() => setShowAction(true)}
          />
        </View>
        <View style={styles.boxRow}>
          <StayWithCustomer />
        </View>
      </CreateListingLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: wp('6%'),
    width: wp('100%'),
    textAlign: 'center',
    color: COLOR_TEXT_DEFAULT,
  },
  boxRow: {
    marginVertical: hp('2%'),
  },
  touchable: {
    marginVertical: hp('3%'),
  },
  labelChooseType: {
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    fontSize: wp('4.5%'),
    marginBottom: 3,
  },
  labelChooseRentType: {
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    fontSize: wp('4.5%'),
    marginBottom: 12,
  },
  divider: {
    height: 1.2,
    backgroundColor: '#ededed',
  },
});
export default RoomInfomationBasic;
