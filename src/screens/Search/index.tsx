import SearchComponent from 'components/SearchComponent';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
interface IProps {
};

const Search: FC<IProps> = (props) => {
  const { } = props;

  return (
    <SearchComponent showInfoGuestAndDates={false} />
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

