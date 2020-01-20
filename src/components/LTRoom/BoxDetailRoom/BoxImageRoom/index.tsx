import React, { FC, useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { hp, wp } from 'utils/responsive';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { COLOR_TEXT_DEFAULT } from 'styles/global.style';
// @ts-ignore
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { IMAGE_STORAGE_LG } from 'types/globalTypes';
interface IProps extends NavigationInjectedProps {
  initialProps?: any;
}

const BoxImageRoom: FC<IProps> = (props) => {
  const { navigation } = props;
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [indexImage, setIndexImage] = useState<number>(0);
  const [mediaToTal, setMediaToTal] = useState<any>([]);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  useEffect(() => {
    let arrayImg: any = [];
    if (listing.avatar.images.length) {
      arrayImg.push(...listing.avatar.images);
    }
    if (listing.cover_photo.images.length) {
      arrayImg.push(...listing.cover_photo.images);
    }
    if (listing.bedrooms.number_bedroom) {
      {
        _.times(listing.bedrooms.number_bedroom, (i) =>
          arrayImg.push(...listing.bedrooms[`bedroom_${i + 1}`].images),
        );
      }
    }
    if (listing.bathrooms.total_image) {
      {
        _.times(listing.bathrooms.number_bathroom, (i) =>
          arrayImg.push(...listing.bathrooms[`bathroom_${i + 1}`].images),
        );
      }
    }
    if (listing.outdoors.images.length) {
      arrayImg.push(...listing.outdoors.images);
    }
    if (listing.furnitures.images.length) {
      arrayImg.push(...listing.furnitures.images);
    }
    if (listing.kitchens.images.length) {
      arrayImg.push(...listing.kitchens.images);
    }
    if (listing.livingrooms.images.length) {
      arrayImg.push(...listing.livingrooms.images);
    }
    let images = arrayImg
      ? _.map(arrayImg, (o, i) => {
          return {
            url: `${IMAGE_STORAGE_LG + arrayImg[i].name}`,
            width: wp('100%'),
            height: hp('50%'),
          };
        })
      : [];
      setMediaToTal(images);
  }, []);
  const footer = () => {
    return (
      <View
        style={{
          width: wp('100%'),
          justifyContent: 'center',
          marginBottom: hp('5%'),
          alignItems: 'center',
        }}>
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
          <Swiper autoplay showsPagination={false}>
            {mediaToTal.map((o: any, i: number) => (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  setIsImageViewVisible(true);
                  setIndexImage(i);
                }}>
                <View style={styles.slider}>
                  <Image
                    source={{
                      uri: `${mediaToTal[i].url}`,
                    }}
                    style={styles.imgAvatar}
                    resizeMode="cover"
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Swiper>
        ),
        [mediaToTal],
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
      {useMemo(
        () => (
          <Modal visible={isImageViewVisible} transparent={true}>
            <ImageViewer
              imageUrls={mediaToTal}
              index={indexImage}
              enableSwipeDown={true}
              onSwipeDown={closeModal}
              onCancel={closeModal}
              renderFooter={footer}
            />
          </Modal>
        ),
        [indexImage, isImageViewVisible, mediaToTal],
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxImage: {
    height: hp('35%'),
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
