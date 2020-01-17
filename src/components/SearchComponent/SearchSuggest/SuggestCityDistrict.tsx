import React, {FC, useState} from 'react';
import {StyleSheet, View, Alert, Text} from 'react-native';
import ListCategory from 'components/GlobalComponents/ListCategory';
import ListPropertySearch from 'components/ListPropertySearch';
import {SearchSuggestData} from 'types/Search/SearchResponse';
import TransitionView from 'components/GlobalComponents/TransitionView';
import CardWithSideText from 'components/GlobalComponents/CardWithSideText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {wp} from 'utils/responsive';
import {COLOR_TITLE_HEADER} from 'styles/global.style';

interface IProps {

}

const SuggestCityDistrict: FC<IProps> = (props) => {
  const [dataSearchSuggest, setDataSearchSuggest] = useState<Array<SearchSuggestData>>([]);
  const [input, setInput] = useState<string>('');

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
  };

  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilter:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('2%')
  }
});

export default SuggestCityDistrict;
