import React, { FC } from 'react';
import {StyleSheet, View, Switch, Text} from 'react-native';
import {wp, hp} from 'utils/responsive';
import {useTranslation} from 'react-i18next';
import {COLOR_BUTTON_DEFAULT} from 'styles/global.style';

interface IProps {
  // sortByDay: boolean,
  // setSortByDay: (value: boolean)=> void,
  sortByFastBook: boolean,
  setSortFastBook: (value: boolean)=>void ,
}

const FilterByDateAndFastBook: FC<IProps> = (props) => {
  const { sortByFastBook, setSortFastBook } = props;
  const { t } = useTranslation();

  return (
    <View style={{ marginTop: hp('2%') }}>
      {/*<View style={styles.item}>*/}
      {/*  <Text style={styles.text}>*/}
      {/*    {t('filter:filterByDateAndFastBook:byDate')}*/}
      {/*  </Text>*/}
      {/*  <Switch*/}
      {/*    value={sortByDay}*/}
      {/*    onValueChange={value => setSortByDay(value)}*/}
      {/*    trackColor={{ false: '#ddd', true: COLOR_BUTTON_DEFAULT }}*/}
      {/*  />*/}
      {/*</View>*/}

      <View style={styles.item}>
        <Text style={styles.text}>
          {t('filter:filterByDateAndFastBook:fastBooking')}
        </Text>
        <Switch
          value={sortByFastBook}
          onValueChange={value => setSortFastBook(value)}
          trackColor={{ false: '#ddd', true: COLOR_BUTTON_DEFAULT }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6%'),
    justifyContent: 'space-between',
  },
  text: { fontSize: wp('4%'), fontWeight: '700' },
});

export default FilterByDateAndFastBook;
