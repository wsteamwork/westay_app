import React, { FC, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { hp } from '../../utils/responsive';
import CardImageWithTextOverlay from '../GlobalComponents/CardImageWithTextOverlay';
import CardWithSideText from '../GlobalComponents/CardWithSideText';
import TransitionView from '../GlobalComponents/TransitionView';
import ListPropertySearch from '../ListSuggestion/ListPropertySearch';
import SearchSuggestionResult from '../ListSuggestion/SearchSuggestionResult';
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
