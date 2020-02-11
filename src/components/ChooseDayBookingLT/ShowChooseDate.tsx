import React, { FC } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { wp } from 'utils/responsive';
import { Text } from 'react-native-elements';
interface IProps {
  fromDate: string;
  toDate: string;
}

const ShowChooseDate: FC<IProps> = (props) => {
  const { fromDate, toDate } = props;
  const { t } = useTranslation();
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
            fontSize: 18,
            color: '#666666',
          }}>
          {fromDate ? (
            fromDate
          ) : (
            <Text
              style={{
                fontSize: 18,
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
            fontSize: 30,
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
            fontSize: 18,
            color: '#666666',
            textAlign: 'right',
          }}>
          {toDate ? (
            toDate
          ) : (
            <Text
              style={
                fromDate
                  ? {
                      fontSize: 18,
                      color: '#ff6600',
                      fontWeight: 'bold',
                    }
                  : {
                      fontSize: 18,
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
