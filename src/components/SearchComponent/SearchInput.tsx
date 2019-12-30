import React, { FC, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_BACKGROUND_INPUT, NORMAL, SIZE_TEXT_SUBTITLE } from '../../styles/global.style';
import { AxiosRes } from '../../types/ResponseTemplate';
import { SearchSuggestRes } from '../../types/Search/SearchResponse';
import { axios } from '../../utils/api';
import { hp } from '../../utils/responsive';
import CardImageWithTextOverlay from '../GlobalComponents/CardImageWithTextOverlay';
import CardWithSideText from '../GlobalComponents/CardWithSideText';
import TransitionView from '../GlobalComponents/TransitionView';
import ListPropertySearch from '../ListSuggestion/ListPropertySearch';
import SearchSuggestionResult from '../ListSuggestion/SearchSuggestionResult';


interface IProps extends NavigationInjectedProps {
  returnKeyType?: "none" | "default" | "done" | "go" | "next" | "search" | "send" | "previous" | "google" | "join" | "route" | "yahoo" | "emergency-call" | undefined;
  height?: number | string;
  returnKeyLabel?: string
};

const GlobalSearchInput: FC<IProps> = (props) => {
  const { returnKeyType, height, returnKeyLabel, navigation } = props;
  const [input, setInput] = useState<string>('');
  const _renderItemListCategory = (item: any) => {
    return (
      <TransitionView
        index={data.indexOf(item)}
      >
        <CardWithSideText
          hasImage={false}
          // hasBadge
          // badgeColor="red"
          icon={<Ionicons name={'ios-search'} size={18} />}
          imageSource={item.imgSrc}
          title={item.title}
          rounded
        />
      </TransitionView>
    );
  }

  const _renderItem = (item: any, index?: number) => {
    return (
      <TransitionView
        index={index}
      >
        <CardImageWithTextOverlay
          _onPress={() => Alert.alert(`Test`)}
          titleOverlay={item.title}
          borderRadius={6}
          textPosition={'BottomLeft'}
          key={item.imgSrc}
          imageSource={item.imgSrc}
          height={85}
        />
      </TransitionView>
    );
  }

  const data = [
    { imgSrc: 'https://m.westay.vn/static/images/property/house.jpg', title: 'Full house' },
    { imgSrc: 'https://m.westay.vn/static/images/property/apartment.jpg', title: 'Apartment' },
    { imgSrc: 'https://m.westay.vn/static/images/property/villa.jpg', title: 'Villa' },
    { imgSrc: 'https://m.westay.vn/static/images/property/room.jpg', title: 'Private room' },
    { imgSrc: 'https://m.westay.vn/static/images/property/hotel.jpg', title: 'Hotel' },
    { imgSrc: 'https://m.westay.vn/static/images/property/studio.jpg', title: 'Studio' }
  ]

  const data2 = [
    { imgSrc: 'https://m.westay.vn/static/images/property/house.jpg', title: 'Full house' },
    { imgSrc: 'https://m.westay.vn/static/images/property/apartment.jpg', title: 'Apartment' },
    { imgSrc: 'https://m.westay.vn/static/images/property/villa.jpg', title: 'Villa' },
    { imgSrc: 'https://m.westay.vn/static/images/property/room.jpg', title: 'Private room' },
    { imgSrc: 'https://m.westay.vn/static/images/property/hotel.jpg', title: 'Hotel' },
    { imgSrc: 'https://m.westay.vn/static/images/property/studio.jpg', title: 'Studio' }
  ]

  // const getSuggestion = (value: string) => {
  const getSuggestion = async (value: string): Promise<any> => {
    const res: AxiosRes<SearchSuggestRes> = await axios.get(`search-suggestions?key=${value}`);
    console.log(res.data, 'Value: -- ' + value)
    //Change response to one-array-data
    //if (Array.isArray(res.data.data[0]))
    // let dataChange: SearchSuggestData[] = [];
    // Object.keys(res.data.data[0]).map((key) => {
    //   res.data.data[0][key].map((item) => {
    //     dataChange.push(item);
    //   });
    // });
    // setData(dataChange);
  };
  // }

  const _onChangeText = (value: any) => {
    // getSuggestion(value);
    console.log(value)
    setInput(value);
  }

  const _onKeyPress = () => {
    Alert.alert(input)
  }

  const styles = StyleSheet.create({
    searchIcon: {
    },
    container: {
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
        <SearchBar
          value={input}
          onChangeText={_onChangeText}
          onSubmitEditing={() => _onKeyPress()}
          underlineColorAndroid="transparent"
          placeholderTextColor={'#7676769d'}
          placeholder={'Search anything'}
          clearButtonMode={'always'}
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
      {
        input ? (
          <View>
            <SearchSuggestionResult
              renderItem={_renderItemListCategory}
              data={data}
            />
          </View>
        ) : (
            <View>
              <ListPropertySearch
                title={'Accommodations'}
                listData={data2}
                renderItem={_renderItem}
              />
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
