import React, { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import SearchInput from './SearchInput';

interface IProps { };

const SearchComponent: FC<IProps> = (props) => {


  useEffect(() => {

  }, [])


  return (
    <SearchInput />
  );
};

const styles = StyleSheet.create({

});
SearchComponent.defaultProps = {

}
export default SearchComponent;
