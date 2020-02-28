import React, { FC, memo } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
// @ts-ignore
import { compose } from 'recompose';
import { setHistorySearch } from 'store/actions/asyncStorage';
import { getCity, setEmptyCityDistrict, setSearchText } from 'store/actions/search/searchActions';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_BUTTON_DEFAULT, COLOR_TEXT_DEFAULT, SIZE_TEXT_SUBTITLE, SIZE_TEXT_TITLE } from 'styles/global.style';
import { wp } from 'utils/responsive';

interface IProps extends NavigationInjectedProps {
  sections: []
}

const SectionListInput: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const historySearch = useSelector<ReducersList, []>(state => state.asyncData.historySearch);

  const { sections, navigation } = props;

  const handleClick = (item: any) => {
    if (item.type !== 3) {
      dispatch(setSearchText(item.name));
      navigation.navigate('ListRooms');
      dispatch(getCity({ id: item.id, type: item.type }));
      dispatch(setEmptyCityDistrict());
    } else {
      navigation.navigate('DetailScreen', { idRoom: item.id });
    }

    if (!historySearch.some((i: any) => i.name === item.name)) {
      dispatch(setHistorySearch([...historySearch, item]));
    }
  };

  const _renderSectionHeader = (section: any) =>
    section.data.length ? (
      <View style={styles.sectionHeader}>
        <Text style={styles.textSectionHeader}>{section.title}</Text>
      </View>
    ) : null;

  const _renderItem = (item: any) => {
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
      style={{ backgroundColor: 'white' }}
      sections={sections}
      renderItem={({ item }) => _renderItem(item)}
      renderSectionHeader={({ section }) => _renderSectionHeader(section)}
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
    justifyContent: 'center',
    height: 38,
    borderBottomColor: '#ddd',
    // borderBottomWidth: 0.5,
    marginVertical: 4,
  },
  textRenderItem: {
    fontSize: SIZE_TEXT_SUBTITLE,
    paddingHorizontal: wp('3%'),
    color: COLOR_TEXT_DEFAULT,
    width: '92%',
  },
  sectionHeader: {
    justifyContent: 'center',
    height: 40,
    borderLeftColor: COLOR_BUTTON_DEFAULT,
    borderLeftWidth: 2,
    backgroundColor: 'white',
  },
  textSectionHeader: {
    fontSize: SIZE_TEXT_TITLE,
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '500',
    paddingHorizontal: wp('4%'),
  },
});

export default compose(
  memo,
  withNavigation,
)(SectionListInput);
