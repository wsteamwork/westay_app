import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SIZE_TEXT_CONTENT, SIZE_TEXT_SUBTITLE, SIZE_TEXT_TITLE_MEDIUM } from '../../../styles/global.style';
import { hp, wp } from '../../../utils/responsive';

interface IProps {
  renderItem: (item: any) => any;
  data: Array<any>;
  horizontalScrollIndicator?: boolean;
  listContainerAdditionalStyle?: Object;
  horizontal?: boolean;
  titleText: string;
  subtitleText: string;
  onPressBottomText?: () => any;
  bottomText?: string;
  onPressTitleText?: () => any;
  onPressSubtitleTitleText?: () => any;
  hasFooter?: boolean;
  footerComponent?: React.ComponentType<any> | React.ReactElement | null;
};

const FlatListWithBackgroundComplex: FC<IProps> = (props) => {
  const { renderItem, data, horizontalScrollIndicator, horizontal, listContainerAdditionalStyle, titleText, subtitleText, onPressBottomText, bottomText, onPressTitleText, onPressSubtitleTitleText, hasFooter, footerComponent } = props;

  return (
    // <ImageBackground
    //   resizeMode="cover"
    //   style={{ width: wp('100%'), height: 'auto' }}
    //   // imageStyle={[styles.imageStyle, additionalImageStyle]}
    //   source={{ uri: 'https://images.unsplash.com/photo-1492892132812-a00a8b245c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' }}
    // >
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.infoBoxContainer}>
          <TouchableWithoutFeedback
            onPress={onPressTitleText}
          >
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>{titleText}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={onPressSubtitleTitleText}
          >
            <View style={styles.subtitleTextContainer}>
              <Text style={styles.subtitleText}>{subtitleText}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.listContainer, listContainerAdditionalStyle]}>
          <FlatList
            style={styles.flatListContainer}
            disableIntervalMomentum={true}
            overScrollMode="always"
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({ item }) => (
              renderItem(item)
            )}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={horizontalScrollIndicator}
            ListFooterComponent={footerComponent}
          />
        </View>
        <View style={styles.bottomTextContainer}>
          <TouchableWithoutFeedback
            onPress={onPressBottomText}
          >
            <View>
              <Text style={styles.bottomText}>{bottomText}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

      </View>

    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('1%'),
    height: hp('31%'),
    paddingHorizontal: 20,
  },
  infoBoxContainer: {
    justifyContent: 'center',
    paddingLeft: wp('4%'),
    height: hp('8%')
  },
  titleTextContainer: {
  },
  subtitleTextContainer: {
    paddingTop: hp('0.5%'),
  },
  flatListContainer: {
  },
  bottomTextContainer: {
    height: hp('5%'),
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: SIZE_TEXT_SUBTITLE,
    color: '#8AA989'
  },
  titleText: {
    fontWeight: '600',
    fontSize: SIZE_TEXT_TITLE_MEDIUM,
    alignItems: 'flex-start',
  },
  subtitleText: {
    color: '#767676',
    alignItems: 'flex-start',
    fontSize: SIZE_TEXT_CONTENT,
  },
  cardContainer: {
    position: 'relative',
    height: hp('27.9%'),
    borderColor: '#C0CEB2',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    flex: 1
  },
  listContainer: {
    paddingLeft: 4,
    marginHorizontal: -26,
    height: hp('15.62%'),
    justifyContent: 'center'
  }
});
FlatListWithBackgroundComplex.defaultProps = {
  horizontalScrollIndicator: false,
  hasFooter: false
}
export default FlatListWithBackgroundComplex;
