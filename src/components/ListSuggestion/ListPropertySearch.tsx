import React, { FC, ReactChild } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { COLOR_TEXT_TITLE, COLOR_URL_TEXT, SEMI_BOLD, SIZE_TEXT_TITLE_FLATLIST } from '../../styles/global.style';
import { wp } from '../../utils/responsive';
interface IProps {
  listData: Array<any>;
  renderItem: (item: any, index: any) => any;
  title?: string;
  additionalItem?: ReactChild;
  hasDivider?: boolean;
};

const ListPropertySearch: FC<IProps> = (props) => {
  const { listData, renderItem, title, additionalItem, hasDivider } = props;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {hasDivider ? (
          <Divider style={[styles.divider]} />
        ) : (<View>
        </View>)}
      </View>
      <View style={styles.categoryContainer}>
        {
          listData.map((item, index) => {
            return (
              renderItem(item, index)
            )
          })
        }
        {
          additionalItem
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: wp('5.5%')
  },
  titleText: {
    fontSize: SIZE_TEXT_TITLE_FLATLIST,
    color: COLOR_TEXT_TITLE,
    fontWeight: SEMI_BOLD
  },
  categoryContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  divider: {
    backgroundColor: COLOR_URL_TEXT,
    height: 1,
    marginTop: 3,
    width: wp('15%'),
  },
});
ListPropertySearch.defaultProps = {
  hasDivider: true
}
export default ListPropertySearch;
