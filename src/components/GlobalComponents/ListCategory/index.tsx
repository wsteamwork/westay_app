import React, { FC } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { COLOR_TEXT_TITLE, COLOR_URL_TEXT, SEMI_BOLD, SIZE_TEXT_TITLE_FLATLIST } from '../../../styles/global.style';
import { wp } from '../../../utils/responsive';
interface IProps {
  showScrollIndicator?: boolean;
  data: Array<Object>;
  renderItem: (item: any) => any;
  hasDivider?: boolean;
  title: string;
  height?: number;
  hasOverlay?: boolean;
};

const ListCategory: FC<IProps> = (props) => {
  const { renderItem, showScrollIndicator, data, hasDivider, title, height, hasOverlay } = props;

  return (
    <View>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {hasDivider ? (
          <Divider style={[styles.divider]} />
        ) : (<View>
        </View>)}
      </View>
      <View style={[styles.listContainer, { height: height }]}>
        <FlatList
          disableIntervalMomentum={true}
          overScrollMode="always"
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => (
            renderItem(item)
          )}
          showsVerticalScrollIndicator={showScrollIndicator}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  titleTextContainer: {
    paddingHorizontal: wp('5.5%'),
    paddingVertical: 10,
    flex: 1,
  },
  titleText: {
    fontSize: SIZE_TEXT_TITLE_FLATLIST,
    color: COLOR_TEXT_TITLE,
    fontWeight: SEMI_BOLD
  },
  divider: {
    backgroundColor: COLOR_URL_TEXT,
    height: 1,
    marginTop: 3,
    width: wp('15%'),
  },
  overlay: {

  }
});
ListCategory.defaultProps = {
  showScrollIndicator: false,
  hasDivider: false,
}
export default ListCategory;
