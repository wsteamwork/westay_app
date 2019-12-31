import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchComponent from '../../components/SearchComponent';
import { hp } from '../../utils/responsive';
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
    marginTop: 45,
    flex: 1,
    height: hp('100%')
  }
});
Search.defaultProps = {

}
export default Search;

