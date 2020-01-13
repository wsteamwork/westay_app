import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, Alert} from 'react-native';
import SearchInput from './SearchInput';
import {wp, hp} from 'utils/responsive';
import {COLOR_TEXT_SUBTITLE, SIZE_TEXT_TITLE_MEDIUM, SIZE_TEXT_CONTENT, COLOR_TITLE_HEADER} from 'styles/global.style';
import {elevationShadowStyle} from 'utils/mixins';
import RoomCard from 'components/GlobalComponents/Cards/RoomCard';
import Feather from 'react-native-vector-icons/Feather';
import ListCategory from 'components/GlobalComponents/ListCategory';
import ListPropertySearch from 'components/ListPropertySearch';
import TransitionView from 'components/GlobalComponents/TransitionView';
import CardWithSideText from 'components/GlobalComponents/CardWithSideText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchSuggestData} from 'types/Search/SearchResponse';
import {getSuggestion} from 'components/SearchComponent/SearchInputContext';

interface IProps { };

const SearchComponent: FC<IProps> = (props) => {
  const [dataSearchSuggest, setDataSearchSuggest] = useState<Array<SearchSuggestData>>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    getSuggestion('Ha Noi').then((res) => {
      setDataSearchSuggest(res);
    });
  }, [input]);


  const _onChangeText = (value: any) => {
    getSuggestion(value).then((res) => {
      setDataSearchSuggest(res);
    });
    setInput(value);
  };

  const _onKeyPress = () => {
    // console.log(dataSearchSuggest);
    setInput(dataSearchSuggest[0].name);
  };

  const _renderItemSearchSuggest = (item: any) => {
    return (
      <TransitionView
        index={dataSearchSuggest.indexOf(item)}
      >
        <CardWithSideText
          hasImage={false}
          icon={<Ionicons name={'ios-search'} size={18} />}
          title={item.name}
          onPress={() => Alert.alert(item.name)}
          rounded
        />
      </TransitionView>
    );
  }

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.container}>

          <SearchInput value={input} _onChangeText={(value => _onChangeText(value))} _onKeyPress={()=>_onKeyPress()}/>

          <View style={styles.boxInfo}>
            <View style={styles.boxDate}>
              <Text style={{color: COLOR_TEXT_SUBTITLE, fontSize: SIZE_TEXT_CONTENT}}>Choose Date</Text>
              <Text style={styles.txtDate}>12 Dec - 22 Dec</Text>
            </View>

            <View style={styles.lineVertical}/>

            <View style={styles.boxDate}>
              <Text style={{color: COLOR_TEXT_SUBTITLE, fontSize: SIZE_TEXT_CONTENT}}>Number of Rooms</Text>
              <Text style={styles.txtDate}>1 Room - 2 Adults</Text>
            </View>
          </View>

          <View>
            <RoomCard />
          </View>

          <View style={styles.boxFilter}>
            <Text>
              299 rooms found
            </Text>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text>Filter</Text>
              <Feather
                name={'filter'}
                size={wp('3.5%')}
                style={{marginLeft: wp('2%')}}
                color={COLOR_TITLE_HEADER}
              />
            </View>
          </View>

        {
          input && dataSearchSuggest ? (
            <View>
              <ListCategory
                title={'Search suggestion'}
                hasDivider
                renderItem={_renderItemSearchSuggest}
                data={dataSearchSuggest}
              />
            </View>
          ) : (
            <View>
              <ListPropertySearch />
            </View>
          )
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('2%')
  },
  boxInfo:{
    flexDirection: 'row',
    marginVertical: hp('2%'),
    justifyContent: 'space-between'
  },
  lineVertical:{
    width: 1,
    height: '100%',
    backgroundColor: COLOR_TEXT_SUBTITLE
  },
  boxDate:{
    width: '50%',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
  },
  txtDate:{
    fontWeight: '700',
    fontSize: SIZE_TEXT_TITLE_MEDIUM
  },
  boxFilter:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('2%')
  }
});
SearchComponent.defaultProps = {

}
export default SearchComponent;
