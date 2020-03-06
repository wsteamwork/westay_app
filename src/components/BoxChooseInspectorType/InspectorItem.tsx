import React, { FC } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { COLOR_BUTTON_DEFAULT } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps extends NavigationInjectedProps {
  title: string;
  isCompleted?: boolean;
}

const InspectorItem: FC<IProps> = (props) => {
  const { navigation, title, isCompleted } = props;
  const { t } = useTranslation();
  return (
    <View>
      <TouchableWithoutFeedback
        style={styles.touchable}
        onPress={() => navigation.navigate('InspectorDetail', { title: title })}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          {!isCompleted ? (
            <View style={styles.showDate}>
              <Text style={styles.notCompleted}>{t('shared:start')}</Text>
              <Entypo name="chevron-right" size={20} color="#484848" />
            </View>
          ) : (
              <View style={styles.showDate}>
                <Text style={styles.completed}>{t('booking:completed')}</Text>
                <Entypo name="chevron-right" size={20} color={COLOR_BUTTON_DEFAULT} />
              </View>
            )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingVertical: hp('4%'),
  },
  showDate: {
    flexDirection: 'row',
  },
  touchable: {
    width: wp('100%'),
    height: hp('100%'),
  },
  title: {
    color: '#adadad',
    fontSize: 16,
    fontWeight: '500',
    marginRight: wp('5%'),
  },
  notCompleted: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: wp('1%'),
  },
  completed: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR_BUTTON_DEFAULT,
    marginRight: wp('1%'),
  },
});
export default withNavigation(InspectorItem);
