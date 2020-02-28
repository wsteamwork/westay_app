import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { COLOR_BUTTON_DEFAULT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { hp } from 'utils/responsive';

interface IProps {
  // sortByDay: boolean,
  // setSortByDay: (value: boolean)=> void,
  sortByFastBook: boolean,
  setSortFastBook: (value: boolean) => void,
}

const FilterByDateAndFastBook: FC<IProps> = (props) => {
  const { sortByFastBook, setSortFastBook } = props;
  const { t } = useTranslation();

  return (
    <View style={{ marginTop: hp('0%') }}>
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
    height: hp('5%'),
    justifyContent: 'space-between',
  },
  text: { fontSize: SIZE_TEXT_TITLE_MEDIUM, fontWeight: '500' },
});

export default FilterByDateAndFastBook;
