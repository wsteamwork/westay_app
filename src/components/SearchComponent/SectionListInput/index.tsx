import React, {FC, memo} from 'react';
import {StyleSheet, View, SectionList, Text, TouchableOpacity} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
import {hp, wp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import {useDispatch, useSelector} from 'react-redux';
import {setEmptyCityDistrict, setSearchText, getCity} from 'store/actions/search/searchActions';
import {setHistorySearch} from 'store/actions/asyncStorage';
import {ReducersList} from 'store/redux/reducers';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import { compose } from 'recompose';

interface IProps extends NavigationInjectedProps{
  sections: []
}

const SectionListInput: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const historySearch = useSelector<ReducersList, []>(state => state.asyncData.historySearch);

  const { sections, navigation } = props;

  const handleClick = (item:any) => {
    if (item.type !== 3) {
      dispatch(setSearchText(item.name));
      navigation.navigate('ListRooms');
      dispatch(getCity({ id: item.id, type: item.type }));
      dispatch(setEmptyCityDistrict());
    } else {
      navigation.navigate('DetailScreen', { idRoom: item.id });
    }

    if (!historySearch.some((i:any) => i.name === item.name)) {
      dispatch(setHistorySearch([...historySearch, item]));
    }
  };

  const _renderSectionHeader = ( section:any ) =>
    section.data.length ? (
      <View style={styles.sectionHeader}>
        <Text style={styles.textSectionHeader}>{section.title}</Text>
      </View>
    ) : null;

  const _renderItem = ( item:any ) => {
    return (
      <TouchableOpacity
        style={styles.renderItem}
        activeOpacity={0.5}
        onPress={() => handleClick(item)}
      >
        {item.type !== 3 ? (
          <IconSimpleLineIcons
            name="location-pin"
            size={wp('5%')}
            color={COLOR_TEXT_DEFAULT}
          />
        ) : (
          <IconAntDesign
            name="home"
            size={wp('5%')}
            color={COLOR_TEXT_DEFAULT}
          />
        )}

        <Text numberOfLines={1} style={styles.textRenderItem}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      sections={sections}
      renderItem={({item})=>_renderItem(item)}
      renderSectionHeader={({section})=>_renderSectionHeader(section)}
      keyExtractor={(item, index) => index.toString()}
      stickySectionHeadersEnabled={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  renderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6%'),
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: hp('1%'),
  },
  textRenderItem: {
    fontSize: wp('4%'),
    paddingLeft: wp('3%'),
    color: COLOR_TEXT_DEFAULT,
    width: '92%',
  },
  sectionHeader: {
    justifyContent: 'center',
    height: hp('5%'),
    borderLeftColor: COLOR_BUTTON_DEFAULT,
    borderLeftWidth: 2,
    backgroundColor: 'white',
  },
  textSectionHeader: {
    fontSize: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    paddingLeft: wp('4%'),
  },
});

export default compose(
  memo,
  withNavigation,
)(SectionListInput);
