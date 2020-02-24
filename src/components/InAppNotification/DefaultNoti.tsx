import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

interface IProps {
  
}

const DefaultNoti: FC<IProps> = (props) => {
  const { } = props;

  return (
    <View style={styles.container}>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DefaultNoti;
