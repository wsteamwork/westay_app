import React, {FC, Dispatch} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {wp, hp} from 'utils/responsive';
import {useTranslation} from 'react-i18next';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';

interface IProps extends NavigationInjectedProps{
  setOpen: Dispatch<boolean>,
  open:boolean,
}

const ActionsMap: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { setOpen, open, navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={{ flex: 1 }} />
      <TouchableOpacity
        style={{ flex: 1, alignItems: 'center' }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Filter')}
      >
        <View style={styles.filter}>
          <IconAntDesign
            name="filter"
            size={wp('4%')}
            style={{ fontWeight: '500' }}
          />
          <Text style={{ fontSize: wp('4%'), fontWeight: '500' }}>
            {t('map:filter')}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.actionsOpen}>
        <IonIcons
          name={!open ? 'md-close' : 'md-pin'}
          size={wp('5%')}
          style={styles.iconOpen}
          onPress={() => setOpen(!open)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp('8%'),
    alignItems: 'center',
  },
  filter: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    borderRadius: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  actionsOpen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconOpen: {
    textAlign: 'center',
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('11%') / 2,
    lineHeight: wp('11%'),
    fontWeight: '500',

    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
});

export default withNavigation(ActionsMap);
