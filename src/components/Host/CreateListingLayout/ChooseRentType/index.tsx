import React, { FC, useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { wp, hp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import RadioButton from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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
  const data1 = [
    {
      label: 'Short Term',
    },
  ];
  const data2 = [
    {
      label: 'Long Term',
    },
  ];
  const handleChoose1 = (e: any) => {
    setShortTerm(!shortTerm);
  };
  const handleChoose2 = (e: any) => {
    setLongTerm(!longTerm);
  };
  return (
    <View>
      <RadioButton
        data={data1}
        selectedBtn={() => setShortTerm(!shortTerm)}
        icon={<Icon name="checkcircle" size={24} color="#2c9dd1" />}
        animationTypes={['rotate']}
        boxStyle={styles.boxStyle}
        initial={0}
      />
      <RadioButton
        data={data2}
        selectedBtn={() => setLongTerm(!longTerm)}
        icon={<Icon name="checkcircle" size={24} color="#2c9dd1" />}
        animationTypes={['rotate']}
        boxStyle={styles.boxStyle}
        initial={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxStyle: {
    borderRadius: 4,
    flexDirection: 'row-reverse',
  },
});

export default ChooseRentType;
