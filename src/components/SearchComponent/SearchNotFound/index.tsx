import React, {FC, memo, useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Platform, Text} from 'react-native';
import {withNavigation, NavigationInjectedProps} from 'react-navigation';
// @ts-ignore
import { compose } from 'recompose';
import {setHistorySearch} from 'store/actions/asyncStorage';
import {wp, hp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT, COLOR_BUTTON_DEFAULT} from 'styles/global.style';
import Toast from 'react-native-root-toast';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {setEmptyCityDistrict, setSearchText, getCity} from 'store/actions/search/searchActions';
import IconIons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS, request} from 'react-native-permissions';

interface IProps extends NavigationInjectedProps{
  historySearch: []
}

const SearchNotFound: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { historySearch, navigation } = props;
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleClick = (item:any) => {
    dispatch(getCity({ id: item.id, type: item.type }));
    dispatch(setEmptyCityDistrict());
    dispatch(setSearchText(item.name));

    if (item.type !== 3) {
      navigation.navigate('ListRooms');
    } else {
      navigation.navigate('BoxImageLT', { idRoom: item.id });
    }
  };

  const findAround = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then((value:any) => {
        if (value === 'authorized') {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
              dispatch(getCity(null));
              dispatch(setSearchText(''));

              navigation.navigate('ListRooms', {
                coords: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
              });
            },
            err => {
              setShowToast(true);
            },
          );
        }
      })
      .catch((err:any) => console.log(err));
  };

  return (
    <View style={{width: wp('90%')}}>
      <Toast visible={showToast} position={150}>
        {t('home:searchNotFound:notLocation')}
      </Toast>

      <TouchableOpacity style={styles.buttonFindAround} onPress={()=>findAround}>
        <IconIons
          name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
          size={wp('5%')}
          color={COLOR_TEXT_DEFAULT}
        />
        <Text style={styles.textFindAround}>
          {t('home:searchNotFound:findAround')}
        </Text>
      </TouchableOpacity>

      {historySearch.length > 0 && (
        <View>
          <View
            style={[
              styles.sectionHeader,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
          >
            <Text style={styles.textSectionHeader}>
              {t('home:searchNotFound:recently')}
            </Text>
            <IconIons
              name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
              size={wp('5%')}
              style={{marginRight: '5%'}}
              onPress={() => dispatch(setHistorySearch([]))}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {historySearch.map((item:any, index:number) => (
              <Text
                key={index}
                style={styles.ganDay}
                onPress={() => handleClick(item)}
              >
                {item.name}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFindAround: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('6%'),
    // borderBottomColor: '#ddd',
    // borderBottomWidth: 1,
  },
  textFindAround: {
    fontSize: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
    paddingLeft: wp('5%'),
  },
  textNoResult: {
    fontSize: wp('4%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    paddingLeft: wp('5%'),
  },
  ganDay: {
    paddingVertical: wp('1%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: wp('2%'),
    marginTop: wp('3%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  sectionHeader: {
    justifyContent: 'center',
    height: hp('5%'),
    borderLeftColor: COLOR_BUTTON_DEFAULT,
    borderLeftWidth: 2,
    backgroundColor: 'white',
  },
  textSectionHeader: {
    fontSize: wp('5%'),
    color: COLOR_TEXT_DEFAULT,
    fontWeight: '700',
    paddingLeft: wp('4%'),
  },
});

export default compose(
  memo,
  withNavigation,
)(SearchNotFound);
