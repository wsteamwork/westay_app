import React, { FC } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import {useTranslation} from 'react-i18next';
import {SIZE_TEXT_CONTENT} from 'styles/global.style';

interface IProps {

}

const Tab1_Comfort: FC<IProps> = (props) => {
  const { } = props;
  const { t  } = useTranslation();

  return (
    <CreateListingLayout titleHeader={t('create_details:titleStep')} titleMain={t('create_basic:tab2')}>
      <View style={styles.row}>
        <Text style={styles.txtTitle}>{t('create_basic:amenities:titleAmenities')}</Text>
        <Text style={styles.txtSubTitle}>{t('create_basic:amenities:subTitleAmenities')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.txtTitle}>{t('create_basic:amenities:titleAmenities')}</Text>
      </View>
    </CreateListingLayout>
  );
};

const styles = StyleSheet.create({
  txtTitle:{
    fontSize: 18,
    marginBottom: 6
  },
  row:{
    marginBottom: 32
  },
  txtSubTitle:{
    fontSize: SIZE_TEXT_CONTENT
  },
});

export default Tab1_Comfort;
