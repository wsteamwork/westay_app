import React, { FC } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SearchInput from './SearchInput';
import {wp, hp} from 'utils/responsive';

interface IProps { };

const SearchComponent: FC<IProps> = (props) => {

  return (
    <View style={styles.container}>
      <SearchInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    // flex:1,
    // backgroundColor:'grey',
    // width: wp('90%'),
    // height: hp('20%')
  }
});
SearchComponent.defaultProps = {

}
export default SearchComponent;
