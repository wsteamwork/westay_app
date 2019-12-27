import React, { FC } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import SearchComponent from '../../components/SearchComponent';

interface IProps {
  initialProps?: any;
};

const Search: FC<IProps> = (props) => {
  const { initialProps } = props;
  const search = (item: any) => {
    Alert.alert(item)
  }
  return (
    <View style={{ marginTop: 100 }}>
      <SearchComponent />
    </View>
  );
};

const styles = StyleSheet.create({

});
Search.defaultProps = {

}
export default Search;

