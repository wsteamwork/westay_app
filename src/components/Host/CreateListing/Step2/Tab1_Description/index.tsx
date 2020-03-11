import React, { FC } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import {useTranslation} from 'react-i18next';
import {
  SIZE_TEXT_TITLE_MEDIUM,
  SIZE_TEXT_TITLE,
  SIZE_TEXT_SUBTITLE,
  SIZE_TEXT_CONTENT,
  COLOR_TEXT_DEFAULT,
} from 'styles/global.style';
import {Input} from 'react-native-elements';
import {wp, stylesGlobal} from 'utils/responsive';

interface IProps {

}

const Tab1_Description: FC<IProps> = (props) => {
  const { } = props;
  const { t  } = useTranslation();

  return (
    <CreateListingLayout titleHeader={t('create_details:titleStep')} titleMain={t('create_basic:tab1')}>
      <View style={styles.row}>
        <Text style={styles.txtTitle}>{t('create_details:listingName')}</Text>
        <Text style={styles.txtSubTitle}>{t('create_details:subName')}</Text>
        <Input
          inputStyle={{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
          containerStyle={styles.containerInput}
          errorStyle={{ color: 'tomato' }}
          autoCorrect={false}
          placeholder={t('create_details:name10Character')}
          // errorMessage='ENTER A VALID ERROR HERE'
          underlineColorAndroid="transparent"
          multiline
          numberOfLines={3}
          maxLength={100}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.txtTitle}>{t('create_details:listingDes')}</Text>
        <Text style={styles.txtSubTitle}>{t('create_details:subDes')}</Text>
        <Input
          inputStyle={{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
          containerStyle={styles.containerInput}
          errorStyle={{ color: 'tomato' }}
          autoCorrect={false}
          placeholder={t('create_basic:des5000Character')}
          // errorMessage='ENTER A VALID ERROR HERE'
          underlineColorAndroid="transparent"
          multiline
          numberOfLines={5}
          maxLength={100}
        />
      </View>

      <View>
        <Text style={stylesGlobal.bigTitle}>{t('create_details:addMoreInfo')}</Text>

        <View style={styles.row}>
          <Text style={styles.txtTitle}>{t('create_details:listingSpace')}</Text>
          <Text style={styles.txtSubTitle}>{t('create_details:subSpace')}</Text>
          <Input
            inputStyle={{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
            containerStyle={styles.containerInput}
            errorStyle={{ color: 'tomato' }}
            autoCorrect={false}
            placeholder={t('create_basic:des5000Character')}
            // errorMessage='ENTER A VALID ERROR HERE'
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={5}
            maxLength={100}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.txtTitle}>{t('create_details:listingRules')}</Text>
          <Text style={styles.txtSubTitle}>{t('create_details:subRules')}</Text>
          <Input
            inputStyle={{fontSize: SIZE_TEXT_TITLE_MEDIUM}}
            containerStyle={styles.containerInput}
            errorStyle={{ color: 'tomato' }}
            autoCorrect={false}
            placeholder={t('create_basic:des5000Character')}
            // errorMessage='ENTER A VALID ERROR HERE'
            underlineColorAndroid="transparent"
            multiline
            numberOfLines={5}
            maxLength={100}
          />
        </View>
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
  containerInput:{
    marginTop: 12,
    borderRadius: 6,
    width:'100%',
    backgroundColor:'#fafafa'
  }
});

export default Tab1_Description;
