import CardWithSideText from 'components/GlobalComponents/CardWithSideText';
import ListCategory from 'components/GlobalComponents/ListCategory';
import TransitionView from 'components/GlobalComponents/TransitionView';
import ListPropertySearch from 'components/ListPropertySearch';
import React, { FC, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SearchSuggestData } from 'types/Search/SearchResponse';

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SuggestCityDistrict;
