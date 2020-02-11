import React, {FC, memo, useContext, useMemo} from 'react';
import { StyleSheet, View } from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Badge} from 'react-native-elements';
import {wp} from 'utils/responsive';

interface IProps extends NavigationInjectedProps{
  name:string,
  color:string
}

const IconTabCustom: FC<IProps> = (props) => {
  const { navigation, name, color } = props;
  // const { stateMessage, dispatchMessage } = useContext(MessagesContext);
  const { routeName } = navigation.state;
  // const { numberNoti } = stateMessage;

  // const value = useMemo(() => {
  //   if (routeName === 'Messages') {
  //     return numberNoti;
  //   } else {
  //     return 0;
  //   }
  // }, [numberNoti]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AntDesign
        name={name}
        size={wp('6.5%')}
        color={color}
        style={{ fontWeight: '300' }}
      />

      {/*{useMemo(*/}
      {/*  () =>*/}
      {/*    value > 0 && (*/}
      {/*            <Badge*/}
      {/*              value={value}*/}
      {/*              containerStyle={{ position: 'absolute', top: 3, right: -8 }}*/}
      {/*              badgeStyle={{ backgroundColor: 'blue' }}*/}
      {/*            />*/}
      {/*          ),*/}
      {/*  [value],*/}
      {/*)}*/}
    </View>
  );
};


export default compose(
  memo,
  withNavigation,
)(IconTabCustom);
