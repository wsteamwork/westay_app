import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_TEXT_DEFAULT, SIZE_TEXT_SUBTITLE } from 'styles/global.style';
import { elevationShadowStyle } from 'utils/mixins';
import { wp } from 'utils/responsive';

interface IProps extends NavigationInjectedProps {
  animation?: any,
}

const InputSearchFake: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const searchText = useSelector<ReducersList, string | undefined>(state => state.searchField.name);
  const { animation, navigation } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.containerStyleInput, elevationShadowStyle(2)]}
        activeOpacity={1}
        onPress={() => navigation.navigate('SearchSuggest')}
      >
        <Ionicons
          name={'ios-search'}
          color={COLOR_TEXT_DEFAULT}
          size={wp('5%')}
          style={{ paddingLeft: wp('5%') }}
        />

        {!searchText ? (
          <Text style={{ fontSize: wp('4%'), paddingLeft: wp('4%'), color: '#7676769d' }}>
            {t('home:searchInput:descInput')}
          </Text>
        ) : (
            <Text style={styles.textSearchText}>{searchText}</Text>
          )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: '5%',
  },
  containerStyleInput: {
    // marginTop: hp('5%'),
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 45,
  },
  textSearchText: {
    fontSize: SIZE_TEXT_SUBTITLE,
    marginLeft: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '400',
  },
});

export default withNavigation(InputSearchFake);
