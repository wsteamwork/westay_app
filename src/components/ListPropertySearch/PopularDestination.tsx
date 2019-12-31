import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import CardWithSideText from '../GlobalComponents/CardWithSideText';
import ListCategory from '../GlobalComponents/ListCategory';
import TransitionView from '../GlobalComponents/TransitionView';

interface IProps {
};

const PopularDestination: FC<IProps> = (props) => {
  // const {  } = props;
  const _renderItemListCategory = (item: any) => {
    return (
      <TransitionView
        index={data.indexOf(item)}
      >
        <CardWithSideText
          // hasBadge
          // badgeColor={COLOR_SUCCESS}
          imageSource={item.imgSrc}
          title={item.title}
          rounded
        />
      </TransitionView>
    );
  }

  const data = [
    { imgSrc: 'https://cdn.pixabay.com/photo/2016/11/02/13/01/winter-1791370__480.jpg', title: 'Vector Free' },
    { imgSrc: 'https://cdn.pixabay.com/photo/2017/04/05/01/16/food-2203732_1280.jpg', title: 'Icon Set' },
    { imgSrc: 'https://cdn.pixabay.com/photo/2019/10/23/19/52/plants-4572694__480.jpg', title: 'App Design' },
    { imgSrc: 'https://cdn.pixabay.com/photo/2019/12/11/15/08/cat-4688579__480.jpg', title: 'Paint Colors' },
    { imgSrc: 'https://cdn.pixabay.com/photo/2019/12/12/13/04/couple-4690635__480.jpg', title: 'Dream House' },
    { imgSrc: 'https://cdn.pixabay.com/photo/2015/12/06/20/10/christmas-bauble-1079926__480.jpg', title: 'Funny Memes' },
    { imgSrc: 'https://cdn.pixabay.com/photo/2019/12/09/13/43/waterfall-4683543__480.jpg', title: 'Illustration Art' }
  ]
  return (
    <View>
      <ListCategory
        // height={160}
        data={data}
        title={'Popular destination'}
        hasDivider
        renderItem={_renderItemListCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});
PopularDestination.defaultProps = {

}
export default PopularDestination;
