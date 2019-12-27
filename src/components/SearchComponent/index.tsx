import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchInput from './SearchInput'
import { hp } from '../../utils/responsive';
interface IProps {
  initialProps?: any;
};

const SearchComponent: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View style={{ height: hp('4.2%') }}>
      <SearchInput />
    </View>
  );
};

const styles = StyleSheet.create({

});
SearchComponent.defaultProps = {

}
export default SearchComponent;
