import { hp } from 'utils/responsive';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchComponent from 'components/SearchComponent';
interface IProps {
};

const Search: FC<IProps> = (props) => {
  const { } = props;

  return (
    <View style={styles.searchScreenContainer}>
      <SearchComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  searchScreenContainer: {
    flex: 1,
  }
});
Search.defaultProps = {

}
export default Search;

