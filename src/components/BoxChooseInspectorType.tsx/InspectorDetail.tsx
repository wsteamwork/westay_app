import React, { FC, useState, useMemo, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { hp, wp } from 'utils/responsive';
import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { AirbnbRating } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LTBookingAction } from 'store/redux/reducers/LTBooking/ltbooking';
/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const InspectorDetail: FC<IProps> = (props) => {
  const { navigation } = props;
  const [completed, setCompleted] = useState<boolean>(false);
  const [comfort1, setComfort1] = useState<number>(0);
  const [comfort2, setComfort2] = useState<number>(0);
  const [comfort3, setComfort3] = useState<number>(0);
  const [comfort4, setComfort4] = useState<number>(0);
  const dispatch = useDispatch<Dispatch<LTBookingAction>>();
  const title = navigation.getParam('title', '');
  useMemo(() => {
    setCompleted(!!comfort1 && !!comfort2 && !!comfort3 && !!comfort4);
  }, [comfort1, comfort2, comfort3, comfort4]);

  useEffect(() => {
    dispatch({ type: 'setCompletedInspector', payload: completed });
  }, [completed]);

  const handleCompletedInspector = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWithBackTitle handlePress={() => navigation.goBack()} title={title} />
        <View style={styles.wrapper}>
          <View style={styles.boxContainer}>
            <View style={styles.boxLeft}>
              <View style={styles.boxTitle}>
                <Text style={styles.title}>Điều hòa</Text>
              </View>
              <View style={styles.boxCamera}>
                <EvilIcons name="camera" size={42} color="#008489" style={styles.iconRight} />
                <Octicons name="file" size={30} color="#008489" />
              </View>
            </View>
            <View style={styles.boxRight}>
              <AirbnbRating
                count={3}
                reviews={['Bad', 'OK', 'Good']}
                defaultRating={comfort1}
                size={32}
                onFinishRating={(rating: number) => setComfort1(rating)}
              />
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.wrapper}>
          <View style={styles.boxContainer}>
            <View style={styles.boxLeft}>
              <View style={styles.boxTitle}>
                <Text style={styles.title}>Tivi</Text>
              </View>
              <View style={styles.boxCamera}>
                <EvilIcons name="camera" size={42} color="#008489" style={styles.iconRight} />
                <Octicons name="file" size={30} color="#008489" />
              </View>
            </View>
            <View style={styles.boxRight}>
              <AirbnbRating
                count={3}
                reviews={['Bad', 'OK', 'Good']}
                defaultRating={comfort2}
                size={32}
                onFinishRating={(rating: number) => setComfort2(rating)}
              />
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.wrapper}>
          <View style={styles.boxContainer}>
            <View style={styles.boxLeft}>
              <View style={styles.boxTitle}>
                <Text style={styles.title}>Sàn nhà</Text>
              </View>
              <View style={styles.boxCamera}>
                <EvilIcons name="camera" size={42} color="#008489" style={styles.iconRight} />
                <Octicons name="file" size={30} color="#008489" />
              </View>
            </View>
            <View style={styles.boxRight}>
              <AirbnbRating
                count={3}
                reviews={['Bad', 'OK', 'Good']}
                defaultRating={comfort3}
                size={32}
                onFinishRating={(rating: number) => setComfort3(rating)}
              />
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.wrapper}>
          <View style={styles.boxContainer}>
            <View style={styles.boxLeft}>
              <View style={styles.boxTitle}>
                <Text style={styles.title}>Máy giặt</Text>
              </View>
              <View style={styles.boxCamera}>
                <EvilIcons name="camera" size={42} color="#008489" style={styles.iconRight} />
                <Octicons name="file" size={30} color="#008489" />
              </View>
            </View>
            <View style={styles.boxRight}>
              <AirbnbRating
                count={3}
                reviews={['Bad', 'OK', 'Good']}
                defaultRating={comfort4}
                size={32}
                onFinishRating={(rating: number) => setComfort4(rating)}
              />
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
      </ScrollView>
      <View style={styles.BoxConfirm}>
        <ButtonOriginal
          title="Gửi"
          handlePress={handleCompletedInspector}
          customStyle={styles.buttonStyle}
          disabled={!completed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: hp('3%'),
    backgroundColor: '#ffffff',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: hp('2%'),
  },
  boxTitle: {
    marginBottom: 15,
  },
  boxLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '50%',
  },
  boxCamera: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  boxRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
    marginTop: -20,
  },
  iconRight: {
    marginRight: wp('4%'),
    marginLeft: -4,
  },
  BoxConfirm: {
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 10,
  },
  buttonStyle: {
    borderRadius: 5,
    elevation: 3,
  },
  divider: {
    backgroundColor: '#efefef',
    marginHorizontal: hp('2.5%'),
    marginVertical: hp('1%'),
    height: 1.5,
  },
  title: {
    color: '#484848',
    fontSize: 18,
    fontWeight: '500',
    marginRight: wp('5%'),
  },
});

export default withNavigation(InspectorDetail);
