import React, { FC, ReactChild } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE, LIGHT, NORMAL, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE_FLATLIST } from 'styles/global.style';
import { wp } from 'utils/responsive';
import AvatarWithBadge from '../AvatarWithBadge';
import TouchableWithScale from '../TouchableComponent/TouchableWithScale';
interface IProps {
  imageSource?: string;
  imagePosition?: 'Left' | 'Right';
  title: string;
  subtitle?: string;
  rounded?: boolean;
  hasImage?: boolean;
  icon?: ReactChild;
  hasBadge?: boolean;
  badgeColor?: string;
  onPress?: (item: any) => any;
  titleTextStyle?: Object;
};

const CardWithSideText: FC<IProps> = (props) => {
  const { imageSource, imagePosition, title, subtitle, rounded, hasImage, icon, hasBadge, badgeColor, onPress, titleTextStyle } = props;

  const styles = StyleSheet.create({
    outerPadding: {
      padding: 0,
    },
    container: {
      height: wp('12%'),
      flex: 1,
    },
    imageContainer: {
      padding: 4,
      flex: 1,
      flexDirection: imagePosition === 'Left' ? 'row' : 'row-reverse',
      paddingHorizontal: 20,
    },
    defaultImageContainer: {
      width: wp('10%'),
      height: wp('10%'),
      borderRadius: 8
    },
    roundImage: {
      borderRadius: 360,
    },
    imageStyle: {
    },
    infoTextContainer: {
      padding: 4,
      height: wp('10%'),
      justifyContent: 'center',
      alignItems: 'flex-start',
      flex: 9,
      paddingHorizontal: 10
    },
    titleContainer: {

    },
    titleText: {
      fontSize: SIZE_TEXT_TITLE_FLATLIST,
      fontWeight: NORMAL,
      color: COLOR_TEXT_TITLE
    },
    subtitleContainer: {

    },
    subtitleText: {
      fontSize: SIZE_TEXT_CONTENT,
      fontWeight: LIGHT,
      color: COLOR_TEXT_SUBTITLE
    },
    iconContainer: {
      padding: 4,
      // backgroundColor: 'red',
      height: wp('10%'),
      justifyContent: 'center',
      alignItems: imagePosition === 'Left' ? 'flex-end' : 'flex-start',
      flex: 1,
      paddingHorizontal: imagePosition === 'Left' ? 4 : 0,
      paddingRight: imagePosition === 'Left' ? 0 : 4,
    }
  });

  return (
    <TouchableWithScale
      _onPress={onPress}
    >
      <View style={styles.outerPadding}>
        <View style={styles.container}>
          <View style={[styles.imageContainer]}>
            {hasImage ? (
              <AvatarWithBadge
                imageSource={imageSource}
                hasBadge={hasBadge}
                rounded={rounded}
                badgeColor={badgeColor}
              />
            ) : <View></View>
            }

            <View style={styles.infoTextContainer}>
              <View style={styles.titleContainer}>
                <Text style={[styles.titleText, titleTextStyle]}>{title}</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              {icon}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithScale>
  );
};

CardWithSideText.defaultProps = {
  imageSource: 'https://cdn.pixabay.com/photo/2017/04/05/01/16/food-2203732_1280.jpg',
  rounded: false,
  imagePosition: 'Left',
  hasImage: true
}
export default CardWithSideText;
