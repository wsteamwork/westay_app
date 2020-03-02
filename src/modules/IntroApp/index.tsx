import React, {FC, useRef, useState} from 'react';
import {StyleSheet, View, Platform, Text, StatusBar, Image} from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {wp, hp} from 'utils/responsive';
import TouchableWithScale from 'components/GlobalComponents/TouchableComponent/TouchableWithScale';
import PaginationIntro from 'modules/IntroApp/PaginationIntro';
import {useTranslation} from 'react-i18next';

interface IProps {
  onDone: ()=> void;
}

const {t} = useTranslation();

const slides = [
  {
    title: `${t('shared:welcomeToWestay')}\n${t('shared:toExperienceHomestay')}`,
    des: '',
    image: require('assets/images/intro/Intro_1.jpeg'),
    colors: ['#fff', '#fff'],
  },
  {
    title: t('shared:solutionForLong-termRental'),
    des: '',
    image: require('assets/images/intro/Intro_2.jpg'),
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    title: t('shared:enjoyTheFunTogether'),
    des: '',
    image: require('assets/images/intro/Intro_3.jpg'),
    colors: ['#29ABE2', '#4F00BC'],
  },
];

const IntroApp: FC<IProps> = (props) => {
  const { onDone } = props;
  const [indexSlider, setIndexSlider] = useState(0);
  const carouselRef = useRef(null);

  const goForward = () => {
    // @ts-ignore
    carouselRef.current.snapToNext();
  };

  // @ts-ignore
  const _renderItem = ({item, index}, parallaxProps) => {

    return (
      <View style={styles.item}>
        <View style={styles.boxLogo}>
          <Image source={require('assets/images/images_web/logo_transparent.png')} style={styles.logo}/>
        </View>
        <ParallaxImage
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.2}
          {...parallaxProps}
        />
        <View style={styles.boxTitle}>
          <Text style={styles.title}>
            { item.title }
          </Text>
        </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        // barStyle={'dark-content'}
        backgroundColor="transparent"
        animated={true}
      />

      <Carousel
        ref={carouselRef}
        sliderWidth={wp('100%')}
        sliderHeight={hp('100%')}
        itemWidth={wp('100%')}
        data={slides}
        renderItem={_renderItem}
        hasParallaxImages={true}
        inactiveSlideOpacity={0.6}
        onSnapToItem={
          (slideIndex)=> setIndexSlider(slideIndex)
        }
      />

      <View style={styles.boxAction}>
        <PaginationIntro dotsLength={slides.length} activeDotIndex={indexSlider}/>
        <TouchableWithScale _onPress={indexSlider !== 2 ? goForward : onDone} style={styles.btnStart}>
          <Text>{indexSlider === 2 ? t('shared:start') : t('shared:next')}</Text>
        </TouchableWithScale>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  boxLogo:{
    position: 'absolute',
    top: hp('3%'),
    left: wp('5%'),
    zIndex:9
  },
  logo:{
    width: wp('45%'),
    height: wp('30%'),
    resizeMode: 'cover',
  },
  item: {
    flex:1,
    width: wp('100%'),
    height: hp('100%'),
    position: 'relative'
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 16,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  boxTitle:{
    position: 'absolute',
    bottom: hp('10%'),
    width: wp('100%'),
    padding: wp('8%')
  },
  title:{
    width: '90%',
    color: 'white',
    fontSize: wp('9%'),
    // fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 6,
  },
  boxAction:{
    position: 'absolute',
    bottom: 0,
    width: wp('100%'),
    padding: wp('8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btnStart:{
    width: '40%',
    // height: 40,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: 0,
    right: 0,
  }
});

export default IntroApp;
