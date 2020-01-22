import React, {FC, Dispatch, useMemo, useState, SetStateAction, Fragment} from 'react';
import {StyleSheet, View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import ButtonOriginal from 'components/Utils/ButtonOriginal';
import {COLOR_BUTTON_DEFAULT, wp, hp} from 'utils/responsive';
import {COLOR_TEXT_DEFAULT} from 'styles/global.style';
import IconEvilIcons                from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {setNumberGuest, setNumberRoom} from 'store/actions/search/searchActions';
import {ReducersList} from 'store/redux/reducers';

interface IProps {
  open: boolean;
  setClose: Dispatch<SetStateAction<boolean>>;
}

const ModalChooseGuest: FC<IProps> = (props) => {
  const { open, setClose } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const number_room = useSelector<ReducersList, number>((state) => state.searchField.number_room);
  const number_guest = useSelector<ReducersList, number>((state) => state.searchField.number_guest);

  const [people, setPeople] = useState(number_room);
  const [room, setRoom] = useState(number_guest);
  const [viewRef] = useState(null);

  const handleSubmit = () => {
    dispatch(setNumberGuest(people));
    dispatch(setNumberRoom(room));
    setClose(false);
    // dispatch(setToggleChoosePeople(false));
  };

  const clickMinusPeople = () => {
    if (people === 1) return;
    setPeople(people - 1);
  };

  const clickMinusRoom = () => {
    if (room === 1) return;
    setRoom(room - 1);
  };

  return (
    <Modal
      isVisible={open}
      onBackButtonPress={() => setClose(false)}
      onBackdropPress={() => setClose(false)}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      coverScreen={true}
      style={{ margin:0 }}
    >
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>

          <View style={[styles.container]}>
            <StatusBar
              // translucent={true}
              backgroundColor="rgba(0, 0, 0, 0.7)"
              barStyle="light-content"
              animated={true}
            />
            <View style={styles.header}>
              <Text style={{ flex: 1 }}/>

              <Text style={styles.headerCenter}>
                {t('home:choosePeople:search')}
              </Text>

              <IconEvilIcons
                name="refresh"
                size={wp('8%')}
                style={{flex:1}}
                color={'tomato'}
                onPress={() => {
                  setPeople(1);
                  setRoom(1);
                }}
              />
            </View>

            {useMemo(
              () => (
                <View style={styles.choose}>
                  <Text style={{ fontSize: wp('4%') }}>
                    {t('home:choosePeople:numberGuest')}
                  </Text>
                  <View style={styles.chooseActions}>
                    <IconEvilIcons
                      name="minus"
                      size={wp('8%')}
                      color={people === 1 ? '#ddd' : COLOR_BUTTON_DEFAULT}
                      onPress={clickMinusPeople}
                    />

                    <Text style={styles.chooseText}>{people}</Text>

                    <IconEvilIcons
                      name="plus"
                      size={wp('8%')}
                      color={COLOR_BUTTON_DEFAULT}
                      onPress={() => setPeople(people + 1)}
                    />
                  </View>
                </View>
              ),
              [people],
            )}

            {useMemo(
              () => (
                <View style={styles.choose}>
                  <Text style={{ fontSize: wp('4%') }}>
                    {t('home:choosePeople:numberRoom')}
                  </Text>
                  <View style={styles.chooseActions}>
                    <IconEvilIcons
                      name="minus"
                      size={wp('8%')}
                      color={room === 1 ? '#ddd' : COLOR_BUTTON_DEFAULT}
                      onPress={clickMinusRoom}
                    />

                    <Text style={styles.chooseText}>{room}</Text>

                    <IconEvilIcons
                      name="plus"
                      size={wp('8%')}
                      color={COLOR_BUTTON_DEFAULT}
                      onPress={() => setRoom(room + 1)}
                    />
                  </View>
                </View>
              ),
              [room],
            )}
            <View style={styles.viewButton}>
              <ButtonOriginal title={t('home:choosePeople:submit')} handlePress={handleSubmit} width={'100%'} height={hp('5%')}/>
            </View>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: 16
  },
  header: {
    flexDirection: 'row',
    paddingBottom: hp('2%'),
    marginBottom: hp('2%'),
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerCenter: {
    flex: 1,
    fontSize: wp('5%'),
    fontWeight: '700',
    color: COLOR_TEXT_DEFAULT,
    textAlign: 'center',
  },
  buttonReset: {
    flex: 1,
    fontSize: wp('4%'),
    fontWeight: '700',
    color: COLOR_TEXT_DEFAULT,
    textAlign: 'right',
    paddingRight: wp('4%'),
  },
  choose: {
    marginVertical: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chooseActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseText: {
    fontSize: wp('4%'),
    width: wp('10%'),
    textAlign: 'center',
  },
  viewButton: {
    marginTop:hp('2%')
  },
  customBackdrop:{
    flex: 1,
  },
  absolute:{
    ...StyleSheet.absoluteFillObject
  }
});

export default ModalChooseGuest;
