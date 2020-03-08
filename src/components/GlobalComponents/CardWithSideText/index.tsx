import React, { FC, ReactChild } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { COLOR_TEXT_SUBTITLE, COLOR_TEXT_TITLE, LIGHT, SEMI_BOLD, SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE_FLATLIST } from 'styles/global.style';
import { wp } from 'utils/responsive';
import Shield from '../../../static/shield.svg';
import AvatarWithBadge from '../AvatarWithBadge';
import {IMAGE_NOT_FOUND} from 'types/globalTypes';
// import TouchableWithScaleAnimation from '../TouchableWithScaleAnimation';
interface IProps {
  imageSource?: string;
  imagePosition?: 'Left' | 'Right';
  title: ReactChild;
  noAnimate?: boolean;
  subtitle?: ReactChild;
  rounded?: boolean;
  hasImage?: boolean;
  icon?: ReactChild;
  hasBadge?: boolean;
  badgeColor?: string;
  onPress?: (item: any) => any;
  titleTextStyle?: Object;
  infoBoxStyle?: Object;
  rightInfo?: ReactChild;
  widthImage?: number;
  imageContainerStyle?: object;
  hasVerified?: boolean;
};

const CardWithSideText: FC<IProps> = (props) => {
  const { imageSource, imagePosition, title, subtitle, rounded, hasImage, icon, hasBadge, badgeColor, onPress, titleTextStyle, rightInfo, widthImage, infoBoxStyle, imageContainerStyle, noAnimate, hasVerified } = props;

  const styles = StyleSheet.create({
    outerPadding: {
      padding: 0,
    },
    container: {
      // height: wp('12%'),
      // backgroundColor: 'red'
    },
    imageContainer: {
      alignItems: 'center',
      padding: 4,
      flex: 1,
      flexDirection: imagePosition === 'Left' ? 'row' : 'row-reverse',
      paddingHorizontal: 10,
    },
    roundImage: {
      borderRadius: 360,
    },
    imageStyle: {
    },
    infoTextContainer: {
      height: widthImage || wp('10%'),
      // justifyContent: 'space-between',
      alignItems: 'flex-start',
      flex: 9,
      paddingHorizontal: 8
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // flex: 1
    },
    titleText: {
      // paddingBottom: 2,
      paddingLeft: 6,
      // backgroundColor: 'red',
      fontSize: SIZE_TEXT_TITLE_FLATLIST,
      fontWeight: SEMI_BOLD,
      color: COLOR_TEXT_TITLE
    },
    subtitleContainer: {
      paddingLeft: 6,
      width: wp('100%'),
      // justifyContent: 'flex-start',
    },
    subtitleText: {
      fontSize: SIZE_TEXT_CONTENT,
      fontWeight: LIGHT,
      color: COLOR_TEXT_SUBTITLE
    },
    iconContainer: {
      padding: 4,
      backgroundColor: 'white',
      height: wp('10%'),
      justifyContent: 'center',
      alignItems: imagePosition === 'Left' ? 'flex-end' : 'flex-start',
      // flex: 3,
      paddingHorizontal: imagePosition === 'Left' ? 4 : 0,
      paddingRight: imagePosition === 'Left' ? 0 : 4,
    }
  });

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={styles.outerPadding}>
        <View style={styles.container}>
          <View style={[styles.imageContainer, imageContainerStyle]}>
            {hasImage ? (
              <AvatarWithBadge
                width={widthImage}
                imageSource={imageSource}
                hasBadge={hasBadge}
                rounded={rounded}
                badgeColor={badgeColor}
              />
            ) : <View></View>
            }

            <View style={[styles.infoTextContainer, infoBoxStyle]}>
              <View style={[styles.titleContainer]}>
                {hasVerified ? (<Shield width={14} height={14} />) : (null)}
                <Text ellipsizeMode={"tail"} numberOfLines={2} style={[styles.titleText, titleTextStyle]}>{title}</Text>
              </View>
              <View style={styles.subtitleContainer}>
                {subtitle}
              </View>
            </View>
            <View style={styles.iconContainer}>
              {icon}
              {rightInfo}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

CardWithSideText.defaultProps = {
  imageSource: IMAGE_NOT_FOUND,
  rounded: false,
  imagePosition: 'Left',
  hasImage: true
}
export default CardWithSideText;
