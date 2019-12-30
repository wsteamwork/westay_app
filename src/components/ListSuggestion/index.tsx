import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import SearchSuggestionResult from './SearchSuggestionResult';

interface IProps { };

const ListSuggestion: FC<IProps> = (props) => {
  return (
    <SearchSuggestionResult />
  );
};

const styles = StyleSheet.create({

});
ListSuggestion.defaultProps = {

}
export default ListSuggestion;
