import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  initialProps?: any;
};

const Home: FC<IProps> = (props) => {
  const { initialProps } = props;

  return (
    <View>

    </View>
  );
};

const styles = StyleSheet.create({

});
Home.defaultProps = {

}
export default Home;
