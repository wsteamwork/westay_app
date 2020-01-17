import React, {FC, useState, useEffect, Fragment} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar} from 'react-native';
import SearchInput from './SearchInput';
import {wp, hp} from 'utils/responsive';
import {COLOR_TEXT_SUBTITLE, SIZE_TEXT_TITLE_MEDIUM, SIZE_TEXT_CONTENT, COLOR_TITLE_HEADER} from 'styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import {SearchSuggestData} from 'types/Search/SearchResponse';
import {getSuggestion} from 'components/SearchComponent/SearchInputContext';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import ModalChooseGuest from 'components/SearchComponent/ChooseGuest/ModalChooseGuest';

interface IProps {
  showInfoGuestAndDates: boolean
}

const SearchComponent: FC<IProps> = (props) => {
  const {showInfoGuestAndDates} = props;
  const [dataSearchSuggest, setDataSearchSuggest] = useState<Array<SearchSuggestData>>([]);
  const [input, setInput] = useState<string>('');
  const [modalGuest, setModalGuest] = useState<boolean>(false);
  const [modalDate, setModalDate] = useState<boolean>(false);

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



  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View style={styles.container}>

          <SearchInput value={input} _onChangeText={(value => _onChangeText(value))} _onKeyPress={()=>_onKeyPress()}/>

        {showInfoGuestAndDates && (
            <View style={styles.boxInfo}>
              <TouchableWithScale style={styles.boxDate} _onPress={()=>setModalDate(!modalDate)}>
                  <Text style={{color: COLOR_TEXT_SUBTITLE, fontSize: SIZE_TEXT_CONTENT}}>Choose Date</Text>
                  <Text style={styles.txtDate}>12 Dec - 22 Dec</Text>
              </TouchableWithScale>
              <View style={styles.lineVertical}/>
              <TouchableWithScale style={styles.boxDate} _onPress={()=>setModalGuest(!modalGuest)}>
                  <Text style={{color: COLOR_TEXT_SUBTITLE, fontSize: SIZE_TEXT_CONTENT}}>Number of Rooms</Text>
                  <Text style={styles.txtDate}>1 Room - 2 Adults</Text>
              </TouchableWithScale>
            </View>
        )}

        <ModalChooseGuest open={modalGuest} setClose={setModalGuest}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('2%'),
    marginTop: StatusBar.currentHeight
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
});
SearchComponent.defaultProps = {
  showInfoGuestAndDates: true
};
export default SearchComponent;
