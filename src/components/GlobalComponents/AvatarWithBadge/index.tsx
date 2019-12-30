import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { COLOR_SUCCESS } from '../../../styles/global.style';
import { wp } from '../../../utils/responsive';
interface IProps {
  rounded?: boolean;
  imageSource?: string;
  hasBadge?: boolean;
  badgeColor?: string;
};

const AvatarWithBadge: FC<IProps> = (props) => {
  const { rounded, imageSource, hasBadge, badgeColor } = props;

  const styles = StyleSheet.create({
    defaultImageContainer: {
      width: wp('10%'),
      height: wp('10%'),
      borderRadius: 8
    },
    badgeContainer: {
      position: 'absolute',
      top: wp('7%'),
      right: -wp('0.5%'),
      borderRadius: 360,
      backgroundColor: hasBadge && badgeColor ? badgeColor : COLOR_SUCCESS,
      justifyContent: 'center'
    },
    badge: {
      backgroundColor: hasBadge && badgeColor ? badgeColor : COLOR_SUCCESS,
      width: wp('3.5%'),
      height: wp('3.5%'),
      borderRadius: 360
    },
    roundImage: {
      borderRadius: 360,
    }
  });

  return (
    <View>
      <Image
        style={[styles.defaultImageContainer, rounded ? styles.roundImage : null]}
        source={{ uri: imageSource }}
      />
      {hasBadge ? (
        <Badge
          status="primary"
          containerStyle={styles.badgeContainer}
          badgeStyle={styles.badge}
        />
      ) : (
          <View></View>
        )}
    </View>
  );
};

AvatarWithBadge.defaultProps = {

}
export default AvatarWithBadge;
