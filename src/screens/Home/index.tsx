import React, { FC } from 'react';
import {StyleSheet, View} from 'react-native';
import ListRoomType from 'components/ListRoomType';
import ListDestinations from 'components/ListRoomType/ListDestinations';
import {wp} from 'utils/responsive';

interface IProps {
  initialProps?: any;
};

const Home: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View style={styles.container}>
      <ListRoomType/>
      <ListDestinations/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: wp('5%')
  }
});
Home.defaultProps = {

}
export default Home;
