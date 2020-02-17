import { hp } from 'utils/responsive';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchComponent from 'components/SearchComponent';
interface IProps {
};

const Search: FC<IProps> = (props) => {
  const { } = props;

  return (
    <SearchComponent />
  );
};

const styles = StyleSheet.create({
  searchScreenContainer: {
    flex: 1,
    // backgroundColor:'red'
  }
});
Search.defaultProps = {

}
export default Search;

