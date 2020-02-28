import LeftSpacePaddingHorizontalScroll from 'components/GlobalComponents/LeftSpacePaddingHorizontalScroll';
import React, { FC, useMemo, useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
// @ts-ignore
import ImageViewer from 'react-native-image-zoom-viewer';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { COLOR_BUTTON_DEFAULT, COLOR_TEXT_TITLE, SIZE_TEXT_TITLE } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
  arrImages?: any;
}

const BoxImageDetail: FC<IProps> = (props) => {
  const { arrImages } = props;
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [indexImage, setIndexImage] = useState<number>(0);
  const _renderItem = (item: any, index: number) => {
    return (
      <View style={{ paddingHorizontal: wp('1.2%') }} key={index}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsImageViewVisible(true);
            setIndexImage(index);
          }}>
          <Image
            borderRadius={8}
            style={styles.image}
            source={{ uri: item.url }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const footer = () => {
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
            marginBottom: hp('5%')
          }}>
          Ảnh phòng tắm
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
      <View style={styles.boxTitle}>
        <Text style={styles.txtTitle}>Take a tour</Text>
        <Text style={styles.explore} onPress={() => setIsImageViewVisible(true)}>
          View all {arrImages.length} photos
        </Text>
      </View>
      <View style={[styles.pdLeft, { marginTop: hp('1%'), marginLeft: -wp('5%') }]}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={arrImages.slice(0, 5)}
          ListHeaderComponent={<LeftSpacePaddingHorizontalScroll width={wp('5%')} />}
          horizontal
          renderItem={({ item, index }) => _renderItem(item, index)}
          extraData={arrImages.slice(0, 5)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {useMemo(
        () => (
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
        ),
        [indexImage, isImageViewVisible, arrImages],
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  boxImage: {
    backgroundColor: 'white',
    // flex: 1,
    display: 'flex',
    // height: 'auto',
    maxHeight: 150,
    // flex: 1
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: SIZE_TEXT_TITLE,
    // marginBottom: hp('2%'),
    fontWeight: '600',
    color: COLOR_TEXT_TITLE,
  },
  pdLeft: {
    // flex: 5
    // marginTop: 38,
  },
  image: {
    height: hp('15%'),
    maxHeight: 110,
    width: wp('40%'),
    borderRadius: 8,
  },
  explore: {
    fontWeight: '400',
    color: COLOR_BUTTON_DEFAULT,
  },
});
BoxImageDetail.defaultProps = {};
export default BoxImageDetail;
