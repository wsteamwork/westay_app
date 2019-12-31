import React, { FC, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { SearchSuggestData } from 'src/types/Search/SearchResponse';
import { COLOR_BACKGROUND_INPUT, NORMAL, SIZE_TEXT_SUBTITLE } from '../../styles/global.style';
import { hp } from '../../utils/responsive';
import CardWithSideText from '../GlobalComponents/CardWithSideText';
import ListCategory from '../GlobalComponents/ListCategory';
import TransitionView from '../GlobalComponents/TransitionView';
import ListPropertySearch from '../ListPropertySearch';
import { getSuggestion } from './SearchInputContext';
interface IProps extends NavigationInjectedProps {
  returnKeyType?: "none" | "default" | "done" | "go" | "next" | "search" | "send" | "previous" | "google" | "join" | "route" | "yahoo" | "emergency-call" | undefined;
  height?: number | string;
  returnKeyLabel?: string
};

const GlobalSearchInput: FC<IProps> = (props) => {
  const { returnKeyType, height, returnKeyLabel, navigation } = props;
  const [input, setInput] = useState<string>('');
  const [dataSearchSuggest, setDataSearchSuggest] = useState<Array<SearchSuggestData>>([])

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

  const _onChangeText = (value: any) => {
    getSuggestion(value).then((res) => {
      setDataSearchSuggest(res);
    });
    setInput(value);
  }

  const _onKeyPress = () => {
    // console.log(dataSearchSuggest);
    setInput(dataSearchSuggest[0].name);
  }

  const styles = StyleSheet.create({
    searchIcon: {
    },
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1
      // backgroundColor: ''
    },
    textInput: {
      width: '100%',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderColor: 'transparent',
      padding: 0,
      margin: 0,
      borderRadius: 4,
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: 'white',
      height: height || hp('4.2%'),
    }
  });
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={[styles.container, { height: hp('4.2%'), backgroundColor: 'white' }]}>
        <View>
          <SearchBar
            value={input}
            onChangeText={_onChangeText}
            onSubmitEditing={() => _onKeyPress()}
            underlineColorAndroid="transparent"
            placeholderTextColor={'#7676769d'}
            placeholder={'Search anything'}
            clearButtonMode={'always'}
            showCancel
            clearIcon={<Icon name="keyboard-o" color={'#7676769d'} />}
            cancelButtonTitle={'Cancel'}
            keyboardType={'default'}
            containerStyle={styles.textInput}
            returnKeyType={returnKeyType}
            returnKeyLabel={returnKeyLabel}
            autoCorrect={false}
            inputContainerStyle={{
              height: height || hp('4.2%'),
              backgroundColor: COLOR_BACKGROUND_INPUT,
              borderRadius: 4
            }}
            inputStyle={{
              color: '#424242',
              fontSize: SIZE_TEXT_SUBTITLE,
              fontWeight: NORMAL,
            }}
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
    </ScrollView>
  );
};

GlobalSearchInput.defaultProps = {
  returnKeyType: 'search',
  returnKeyLabel: 'Search'
}
export default withNavigation(GlobalSearchInput);
