import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import { wp, hp } from 'utils/responsive';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
interface IProps {
  people: number;
  setPeople: (value: number) => void;
}
const ChooseGuest: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { maxGuestRoom } = useSelector<ReducersList, any>((state) => state.ltbooking);
  const { people, setPeople } = props;
  const clickPlusPeople = () => {
    if (people === maxGuestRoom) return;
    setPeople(people + 1);
  };

  const clickMinusPeople = () => {
    if (people === 1) return;
    setPeople(people - 1);
  };
  return (
    <View style={styles.choose}>
      <Text style={styles.text}>{t('home:choosePeople:numberGuest')}</Text>
      <View style={styles.chooseActions}>
        <IconEvilIcons
          name="minus"
          size={wp('12%')}
          color={people === 1 ? '#ddd' : COLOR_BUTTON_DEFAULT}
          onPress={clickMinusPeople}
        />
        <Text style={styles.chooseText}>{people}</Text>
        <IconEvilIcons
          name="plus"
          size={wp('12%')}
          color={people === maxGuestRoom ? '#ddd' : COLOR_BUTTON_DEFAULT}
          onPress={clickPlusPeople}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  choose: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: hp('2%'),
  },
  chooseActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseText: {
    fontSize: wp('4%'),
    width: wp('10%'),
    textAlign: 'center',
  },
  text: {
    color: '#adadad',
    fontSize: 16,
    fontWeight: '500',
    marginRight: wp('5%'),
  },
});

export default ChooseGuest;
