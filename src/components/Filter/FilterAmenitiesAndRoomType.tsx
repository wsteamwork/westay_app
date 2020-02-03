import React, { FC } from 'react';
import {StyleSheet, View, SectionList, Text, SectionListData} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hp, wp} from 'utils/responsive';
import {__currentPlatform} from 'utils/mixins';
// @ts-ignore
import Checkbox from 'react-native-modest-checkbox';

interface IProps {
  sections: [],
  roomType: [],
  amenities: [],
  addDataRoomType: (change: any, id: any)=> void,
  addDataAmenities: (change: any, id: any)=> void,
}

const FilterAmenitiesAndRoomType: FC<IProps> = (props) => {
  const {
          sections,
          roomType,
          amenities,
          addDataRoomType,
          addDataAmenities,
        } = props;

  const _renderItem = ( item:any, i:number ) => {
    return (
      <View key={i}>
        <Checkbox
          noFeedback={true}
          labelBefore
          uncheckedComponent={
            <Ionicons
              name={__currentPlatform ? 'md-square-outline' : 'ios-square-outline' }
              size={wp('6%')}
            />
          }
          checkedComponent={
            <Ionicons
              name={__currentPlatform ? 'md-checkbox-outline' : 'ios-checkbox-outline'}
              size={wp('6%')}
            />
          }
          label={item.name}
          checked={
            item.type === 1
              ? roomType.some((i:any) => i.name === item.name)
              : amenities.some((i:any) => i.name === item.name)
          }
          onChange={(change:any) =>
            item.type === 1
              ? addDataRoomType(change, item.id)
              : addDataAmenities(change, item.id)
          }
          containerStyle={{ justifyContent: 'space-between', height: hp('6%') }}
        />
      </View>
    );
  };

  const _renderSectionHeader = (section:any ) => {
    return (
      <View>
        <Text
          style={{
            fontSize: wp('5%'),
            fontWeight: '700',
            backgroundColor: 'white',
            height: hp('5%'),
            alignItems: 'center',
          }}
        >
          {section.title}
        </Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={({item,index}) =>_renderItem(item,index)}
        renderSectionHeader={({section})=>_renderSectionHeader(section)}
        keyExtractor={(item, index) => index.toString()}
        stickySectionHeadersEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('2%'),
    flex: 1,
    marginBottom: hp('6.5%')
  },
});

export default FilterAmenitiesAndRoomType;
