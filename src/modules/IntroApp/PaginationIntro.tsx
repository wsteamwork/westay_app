import React, { FC } from 'react';
import {Pagination} from 'react-native-snap-carousel';

interface IProps {
  dotsLength: number,
  activeDotIndex:number
}

const PaginationIntro: FC<IProps> = (props) => {
  const { dotsLength, activeDotIndex } = props;

  return (
    <Pagination
      dotsLength={dotsLength}
      activeDotIndex={activeDotIndex}
      containerStyle={{alignItems:'flex-start', justifyContent: 'flex-start'}}
      dotStyle={{
        width: 8,
        height: 8,
        borderRadius: 5,
        // marginHorizontal: ,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
      }}
      inactiveDotStyle={{
        // Define styles for inactive dots here
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );
};

export default PaginationIntro;
