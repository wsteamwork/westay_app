import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import {useTranslation} from 'react-i18next';
import {hp, wp} from 'utils/responsive';
import {COLOR_LINEAR_DEFAULT} from 'styles/global.style';
import {Button} from 'react-native-elements';

interface IProps {
  handleSubmit: ()=> void
}

const FilterActions: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { handleSubmit } = props;

  return (
    <View style={styles.viewActions}>
      <Button
        onPress={handleSubmit}
        title={t('filter:filterActions:search')}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: COLOR_LINEAR_DEFAULT,
          start: { x: 0.5, y: 1 },
          end: { x: 1, y: 1 },
        }}
        buttonStyle={styles.buttonTitle}
        titleStyle={{ fontSize: wp('5%'), color: 'white' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewActions: {
    position: 'absolute',
    bottom: 0,
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  buttonTitle: {
    width: wp('60%'),
    borderRadius: 4,
    backgroundColor: 'transparent',
    height: hp('5%'),
  },
});

export default FilterActions;
