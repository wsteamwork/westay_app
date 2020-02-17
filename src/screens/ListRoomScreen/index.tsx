import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import ListRooms from 'components/ListRooms';
import collapsibleParams from 'components/ListRooms/CollapHeader';
// @ts-ignore
import {withCollapsible} from 'react-navigation-collapsible';

const ListRoomScreen = (props:any) => {
  const { paddingHeight, animatedY, onScroll } = props.collapsible;

  return (
    <View style={styles.container}>
      <ListRooms
        paddingHeight={paddingHeight}
        animatedY={animatedY}
        onScroll={onScroll}
      />
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

export default withCollapsible(ListRoomScreen, collapsibleParams);
