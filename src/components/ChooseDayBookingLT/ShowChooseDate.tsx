import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'store/context/auth';
import { SIZE_TEXT_TITLE } from 'styles/global.style';
import { formatDateBooking } from 'utils/mixins';
import { wp } from 'utils/responsive';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  fromDate: string;
  toDate: string;
}

const ShowChooseDate: FC<IProps> = (props) => {
  const { fromDate, toDate } = props;
  const { t } = useTranslation();
  const { state } = useContext(AuthContext);
  const { languageStatus } = state;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('14%'),
        paddingBottom: 5,
        alignItems: 'center',
      }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: SIZE_TEXT_TITLE,
            color: '#666666',
          }}>
          {fromDate ? (
            formatDateBooking(fromDate, languageStatus, true)
          ) : (
              <Text
                style={{
                  fontSize: SIZE_TEXT_TITLE,
                  color: '#ff6600',
                  fontWeight: 'bold',
                }}>
                {t('home:chooseDate:check_in')}
              </Text>
            )}
        </Text>
      </View>

      <View>
        <Text
          style={{
            fontSize: SIZE_TEXT_TITLE,
            paddingBottom: 8,
            color: '#666666',
            textAlign: 'center',
          }}>
          &#8594;
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: SIZE_TEXT_TITLE,
            color: '#666666',
            textAlign: 'right',
          }}>
          {toDate ? (
            formatDateBooking(toDate, languageStatus, true)
          ) : (
              <Text
                style={
                  fromDate
                    ? {
                      fontSize: SIZE_TEXT_TITLE,
                      color: '#ff6600',
                      fontWeight: 'bold',
                    }
                    : {
                      fontSize: SIZE_TEXT_TITLE,
                    }
                }>
                {t('home:chooseDate:check_out')}
              </Text>
            )}
        </Text>
      </View>
    </View>
  );
};

export default ShowChooseDate;
