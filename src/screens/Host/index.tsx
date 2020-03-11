import React, { FC, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { wp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import { Divider } from 'react-native-elements';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import { hp } from 'components/Utils/responsive.style';
import ChooseRoomType from 'components/Host/CreateListingLayout/ChooseRoomType';
import ChooseRentType from 'components/Host/CreateListingLayout/ChooseRentType';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const Host: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [modalRoomType, setModalRoomType] = useState<boolean>(false);
  return (
    <SafeAreaView style={styles.container}>
      <CreateListingLayout titleHeader={'Step 1'} titleMain={'Tell us about your place'}>
        <TouchableWithScale
          style={styles.touchable}
          _onPress={() => setModalRoomType(!modalRoomType)}>
          <View style={styles.boxChooseRoomType}>
            <Text style={styles.labelChooseType}>First, choose lease type</Text>
            <ChooseRentType />
          </View>
          <View style={styles.boxChooseRoomType}>
            <Text style={styles.labelChooseType}>Second, choose a property type</Text>
            <ChooseRoomType />
            <Divider style={styles.divider} />
          </View>
        </TouchableWithScale>
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
  boxChooseRoomType: {
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
  divider: {
    height: 1.3,
    backgroundColor: '#ededed',
  },
});
Host.defaultProps = {};
export default Host;
