import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
import { CheckBox, Text } from 'react-native-elements';
import { COLOR_TEXT_DEFAULT, COLOR_MERCHANT_DEFAULT } from 'styles/global.style';
/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const ChooseRentType: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const [shortTerm, setShortTerm] = useState<boolean>(false);
  const [longTerm, setLongTerm] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <CheckBox
        title={
          <View style={{ flex: 1 }}>
            <Text style={styles.textStyle}>Ngắn hạn</Text>
            <Text style={styles.subTextStyle}>Bao gồm theo ngày & theo giờ</Text>
          </View>
        }
        iconRight
        iconType="material"
        uncheckedIcon="check-box-outline-blank"
        checkedIcon="check-box"
        checkedColor={COLOR_MERCHANT_DEFAULT}
        checked={shortTerm}
        onPress={() => setShortTerm(!shortTerm)}
        containerStyle={styles.boxStyle}
        size={32}
      />
      <CheckBox
        title={
          <View style={{ flex: 1 }}>
            <Text style={styles.textStyle}>Dài hạn</Text>
            <Text style={styles.subTextStyle}>Đặt phòng từ 30 ngày</Text>
          </View>
        }
        iconRight
        iconType="material"
        uncheckedIcon="check-box-outline-blank"
        checkedIcon="check-box"
        checkedColor={COLOR_MERCHANT_DEFAULT}
        checked={longTerm}
        onPress={() => setLongTerm(!longTerm)}
        containerStyle={styles.boxStyle}
        size={32}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: -10,
  },
  boxStyle: {
    width: '100%',
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: COLOR_TEXT_DEFAULT,
    marginBottom: 5,
  },
  subTextStyle: {
    fontSize: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
  },
});

export default ChooseRentType;
