import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  initialProps?: any;
};

const Search: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});
Search.defaultProps = {

}
export default Search;

