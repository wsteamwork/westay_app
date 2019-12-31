import React, { FC } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SEMI_BOLD, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { wp } from 'utils/responsive';
import TouchableWithScale from '../TouchableComponent/TouchableWithScale';

interface IProps {
  imageSource?: string;
  textPadding?: number;
  borderRadius?: number;
  height?: number;
  additionalImageStyle?: Object;
  imageBackgroundAdditionalStyle?: Object;
  backgroundBlur?: number;
  useLinear?: boolean;
  titleOverlay?: string;
  _onPress?: (item: any) => any;
  _onLongPress?: (item: any) => any;
  textPosition: 'Middle' | 'BottomLeft' | 'TopRight' | 'BottomRight' | 'TopLeft';
  textColor?: string;
  hasBorder?: boolean;
};

const CardImageWithTextOverlay: FC<IProps> = (props) => {
  const { imageSource, additionalImageStyle, imageBackgroundAdditionalStyle, backgroundBlur, useLinear, borderRadius, textPadding, height, titleOverlay, _onPress, _onLongPress, textColor, hasBorder } = props;

  const styles = StyleSheet.create({
    hasBorderContainer: {
      borderColor: '#C0CEB2',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 12
    },
    container: {
      // justifyContent: 'center',
      width: wp('45%'),
      height: height,
      backgroundColor: 'transparent'
    },
    imageContainer: {
    },
    defaultImageBackground: {
      flexDirection: 'row'
    },
    imageStyle: {
      borderRadius: borderRadius,
      width: '100%',
      height: '100%'
    },
    textContainerMiddle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textContainerTopRight: {
      padding: textPadding ? textPadding : 8,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    },
    textContainerTopLeft: {
      padding: textPadding ? textPadding : 8,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    textContainerBottomRight: {
      padding: textPadding ? textPadding : 8,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    textContainerBottomLeft: {
      padding: textPadding ? textPadding : 8,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    },
    linearGradient: {
      height: '100%',
      borderRadius: borderRadius,
      alignContent: "flex-end",
      justifyContent: 'flex-end',
    },
    imageOverlay: {
      height: '100%',
      flex: 1,
      backgroundColor: '#4a217a00',
      alignContent: "flex-end",
      justifyContent: 'flex-end',
    },
    textTitle: {
      fontSize: SIZE_TEXT_TITLE_MEDIUM,
      fontWeight: SEMI_BOLD,
      color: textColor
    }
  });

  const position = {
    'Middle': styles.textContainerMiddle,
    'TopRight': styles.textContainerTopRight,
    'TopLeft': styles.textContainerTopLeft,
    'BottomRight': styles.textContainerBottomRight,
    'BottomLeft': styles.textContainerBottomLeft
  }
  return (
    <View style={[{ padding: 6 }]}>
      <View style={[styles.container, hasBorder ? styles.hasBorderContainer : null]}>
        <TouchableWithScale
          _onPress={_onPress}
          _onLongPress={_onLongPress}
        >
          <View style={[styles.imageContainer]}>
            <ImageBackground
              blurRadius={backgroundBlur}
              resizeMode="cover"
              style={[styles.defaultImageBackground, imageBackgroundAdditionalStyle]}
              imageStyle={[styles.imageStyle, additionalImageStyle]}
              source={imageSource ? { uri: imageSource } : {}}
            >
              <View style={styles.imageOverlay}>
                {useLinear ? (
                  <LinearGradient colors={['#b5b5b511', '#00000011', '#00000050', '#000000a1']} style={styles.linearGradient}>
                    <View style={position[props.textPosition]}>
                      <Text style={styles.textTitle}>{titleOverlay}</Text>
                    </View>
                  </LinearGradient>
                ) : (
                    <View style={position[props.textPosition]}>
                      <Text style={styles.textTitle}>{titleOverlay}</Text>
                    </View>
                  )}

              </View>
            </ImageBackground>
          </View>
        </TouchableWithScale>
      </View>
    </View>
  );
};


CardImageWithTextOverlay.defaultProps = {
  useLinear: true,
  textPosition: 'BottomLeft',
  textColor: 'white',
  borderRadius: 6,
  textPadding: 8,
  backgroundBlur: 0,
  height: 85,
  // imageSource: 'https://cdn.pixabay.com/photo/2017/04/05/01/16/food-2203732_1280.jpg'
}
export default CardImageWithTextOverlay;
