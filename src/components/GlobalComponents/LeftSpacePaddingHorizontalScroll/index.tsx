import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
/**
 * Add a view with transparent background to the left of the flatlist horizontal instead of paddingLeft for horizontal scroll
 */
interface IProps {
  width: number;
};

const LeftSpacePaddingHorizontalScroll: FC<IProps> = (props) => {
  const { width } = props;

  return (
    <View style={{ backgroundColor: 'white', width: width, margin: 0, padding: 0 }}></View>
  );
};

const styles = StyleSheet.create({

});
LeftSpacePaddingHorizontalScroll.defaultProps = {

}
export default LeftSpacePaddingHorizontalScroll;
