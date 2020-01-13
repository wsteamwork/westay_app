import React, { FC, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import {
  COLOR_BACKGROUND_INPUT,
  NORMAL,
  SIZE_TEXT_SUBTITLE,
  COLOR_TEXT_DEFAULT,
  COLOR_TEXT_SUBTITLE, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE, SIZE_TEXT_TITLE_MEDIUM, COLOR_TITLE_HEADER,
} from 'styles/global.style';
import { SearchSuggestData } from 'types/Search/SearchResponse';
import {hp, wp} from 'utils/responsive';
import CardWithSideText from '../GlobalComponents/CardWithSideText';
import ListCategory from '../GlobalComponents/ListCategory';
import TransitionView from '../GlobalComponents/TransitionView';
import ListPropertySearch from '../ListPropertySearch';
import { getSuggestion } from './SearchInputContext';
import {elevationShadowStyle, __currentPlatform} from 'utils/mixins';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import RoomCard from 'components/GlobalComponents/Cards/RoomCard';

interface IProps extends NavigationInjectedProps {
  returnKeyType?: "none" | "default" | "done" | "go" | "next" | "search" | "send" | "previous" | "google" | "join" | "route" | "yahoo" | "emergency-call" | undefined;
  height?: number | string;
  returnKeyLabel?: string
};

const GlobalSearchInput: FC<IProps> = (props) => {
  const { returnKeyType, height, returnKeyLabel, navigation } = props;
  const [input, setInput] = useState<string>('');
  const [dataSearchSuggest, setDataSearchSuggest] = useState<Array<SearchSuggestData>>([]);

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
    container: {
      justifyContent:'center',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      paddingVertical: wp('2%')
    },
    viewInput: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
    },
    textInput: {
      width: '100%',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      borderColor: 'transparent',
      padding: 0,
      margin: 0,
      borderRadius: 50,
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
  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.container}>
        <View style = {[styles.viewInput, elevationShadowStyle(10)]}>
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
              // height: height || hp('4.2%'),
              backgroundColor: 'white',
              borderRadius: 50
            }}
            inputStyle={{
              color: '#424242',
              fontSize: SIZE_TEXT_SUBTITLE,
              fontWeight: NORMAL,
            }}
            searchIcon = {
              <Ionicons
                name = {'ios-search'}
                color = {COLOR_TEXT_DEFAULT}
                size = {wp('5%')}
                style = {{paddingLeft: wp('3%')}}
              />
            }
          />
        </View>
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
