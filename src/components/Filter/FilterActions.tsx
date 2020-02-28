import { hp } from 'components/Utils/responsive.style';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { COLOR_BUTTON_DEFAULT, SIZE_TEXT_TITLE_MEDIUM } from 'styles/global.style';
import { wp } from 'utils/responsive';

interface IProps {
  handleSubmit: () => void
}

const FilterActions: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { handleSubmit } = props;

  return (

    <View style={styles.viewActions}>
      <Button
        onPress={handleSubmit}
        title={t('filter:filterActions:search')}
        // ViewComponent={LinearGradient}
        // linearGradientProps={{
        //   colors: COLOR_LINEAR_DEFAULT,
        //   start: { x: 0.5, y: 1 },
        //   end: { x: 1, y: 1 },
        // }}
        buttonStyle={styles.buttonTitle}
        titleStyle={{ fontSize: SIZE_TEXT_TITLE_MEDIUM }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewActions: {
    paddingVertical: 4,
    bottom: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  buttonTitle: {
    width: wp('60%'),
    borderRadius: 4,
    backgroundColor: COLOR_BUTTON_DEFAULT,
  },
});

export default FilterActions;
