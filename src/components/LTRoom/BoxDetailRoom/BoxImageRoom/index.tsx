import React, { FC, useMemo, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-elements';
// @ts-ignore
import ImageViewer from 'react-native-image-zoom-viewer';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_BUTTON_DEFAULT, COLOR_TEXT_DEFAULT } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
import { useTranslation } from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  initialProps?: any;
  arrImages?: any;
}

const BoxImageRoom: FC<IProps> = (props) => {
  const { navigation, arrImages } = props;
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [indexImage, setIndexImage] = useState<number>(0);
  const { t } = useTranslation();
  const footer = (currentIdx: number) => {
    return (
      <View
        style={{
          width: wp('100%'),
          justifyContent: 'center',
          marginBottom: hp('5%'),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#ffffff',
            marginBottom: hp('5%'),
          }}>
          {arrImages[currentIdx].type}
        </Text>
        <EvilIcons onPress={closeModal} name="close-o" color="#ffffff" size={40} />
      </View>
    );
  };
  const closeModal = () => {
    setIsImageViewVisible(false);
    setIndexImage(0);
  };
  return (
    <View style={styles.boxImage}>
      {useMemo(
        () => (
          <Swiper
            autoplay={false}
            showsPagination={false}
            paginationStyle={{ bottom: 4 }}
            activeDotColor={COLOR_BUTTON_DEFAULT}>
            {arrImages.map((o: any, i: number) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  setIsImageViewVisible(true);
                  setIndexImage(i);
                }}>
                <View style={styles.slider}>
                  <Image
                    source={{
                      uri: `${arrImages[i].url}`,
                    }}
                    style={styles.imgAvatar}
                    resizeMode="cover"
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Swiper>
        ),
        [arrImages],
      )}
      <View style={styles.featureImage}>
        <View style={styles.btnBack}>
          <TouchableOpacity style={styles.bgIcon} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {useMemo(
        () => (
          <View style={styles.boxBtn}>
            <Button
              buttonStyle={styles.btnMore}
              title=""
              icon={<Icon name="maximize" size={15} color={COLOR_TEXT_DEFAULT} />}
              titleStyle={styles.textBtnMore}
              onPress={() => setIsImageViewVisible(true)}
            />
          </View>
        ),
        [],
      )}

      <Modal visible={isImageViewVisible} transparent={true}>
        <ImageViewer
          imageUrls={arrImages}
          index={indexImage}
          enableSwipeDown={true}
          onSwipeDown={closeModal}
          onCancel={closeModal}
          renderFooter={footer}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  boxImage: {
    height: hp('40%'),
    maxHeight: 400,
    backgroundColor: 'transparent',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgAvatar: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  featureImage: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('2%'),
    width: wp('100%'),
    height: hp('8%'),
  },
  btnBack: {
    flex: 1,
    paddingLeft: 16,
    paddingTop: 10,
  },
  bgIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    right: 0,
  },
  boxBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: hp('2%'),
    width: wp('100%'),
    height: hp('8%'),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    right: hp('3%'),
  },
  btnMore: {
    backgroundColor: '#fff',
    padding: 6,
  },
  textBtnMore: {
    color: COLOR_TEXT_DEFAULT,
    fontSize: 12,
  },
});
BoxImageRoom.defaultProps = {};
export default withNavigation(BoxImageRoom);
