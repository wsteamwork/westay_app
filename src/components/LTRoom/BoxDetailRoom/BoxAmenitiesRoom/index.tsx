import HeaderWithBackTitle from 'components/CustomHeaderNavigation/HeaderWithBackTitle';
import React, { FC, useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Tooltip } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import { useSelector } from 'react-redux';
import { ReducersList } from 'store/redux/reducers';
import { COLOR_BUTTON_DEFAULT, COLOR_TEXT_TITLE, SIZE_TEXT_TITLE } from 'styles/global.style';
import { hp, wp } from 'utils/responsive';
import {useTranslation} from 'react-i18next';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const BoxAmenitiesRoom: FC<IProps> = (props) => {
  const [collapsedComfort, setCollapsedComfort] = useState(false);
  const listing = useSelector<ReducersList, any>((state) => state.ltRoomDetails.room);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.txtTitle}>{t('details:amenities')}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        {listing.comforts.facilities.map(
          (o: any, i: number) =>
            i < 5 && (
              <Tooltip
                key={i}
                withOverlay={false}
                popover={<Text style={{ color: '#fff' }}>{o.comfort_trans[0].name}</Text>}>
                <SvgUri width="24" height="24" source={{ uri: o.icon }} />
              </Tooltip>
            ),
        )}
        <TouchableOpacity onPress={() => setCollapsedComfort(true)}>
          <Text style={{ fontSize: 24, color: COLOR_BUTTON_DEFAULT, fontWeight: '400' }}>
            +{listing.total_comforts - 5}
          </Text>
        </TouchableOpacity>
      </View>
      {useMemo(
        () => (
          <Modal
            animationType="slide"
            transparent={false}
            onRequestClose={() => setCollapsedComfort(false)}
            visible={collapsedComfort}>
            <HeaderWithBackTitle
              handlePress={() => setCollapsedComfort(false)}
              containerStyle={{ paddingTop: hp('3%') }}
            />

            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp('4%'),
                  flex: 1,
                }}>
                {listing.comforts.facilities !== undefined && listing.comforts.facilities.length ? (
                  <View
                    style={{
                      marginBottom: hp('3%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {t('details:facilities')}
                    </Text>
                    {listing.comforts.facilities.map((o: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          width: wp('90%'),
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#484848',
                            textAlignVertical: 'center',
                          }}>
                          {o.comfort_trans[0].name}
                        </Text>
                        <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                      </View>
                    ))}
                  </View>
                ) : (
                    <Text></Text>
                  )}
                {listing.comforts.livingrooms !== undefined &&
                  listing.comforts.livingrooms.length ? (
                    <View
                      style={{
                        marginBottom: hp('3%'),
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                        }}>
                        {t('details:livingRoom')}
                    </Text>
                      {listing.comforts.livingrooms.map((o: any, i: number) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            width: wp('90%'),
                            marginVertical: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#484848',
                              textAlignVertical: 'center',
                            }}>
                            {o.comfort_trans[0].name}
                          </Text>
                          <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text></Text>
                  )}
                {listing.comforts.bedrooms !== undefined && listing.comforts.bedrooms.length ? (
                  <View
                    style={{
                      marginBottom: hp('3%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {t('details:bedRoom')}
                    </Text>
                    {listing.comforts.bedrooms.map((o: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          width: wp('90%'),
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#484848',
                            textAlignVertical: 'center',
                          }}>
                          {o.comfort_trans[0].name}
                        </Text>
                        <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                      </View>
                    ))}
                  </View>
                ) : (
                    <Text></Text>
                  )}
                {listing.comforts.bathrooms !== undefined && listing.comforts.bathrooms.length ? (
                  <View
                    style={{
                      marginBottom: hp('3%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {t('details:bathroom')}
                    </Text>
                    {listing.comforts.bathrooms.map((o: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          width: wp('90%'),
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#484848',
                            textAlignVertical: 'center',
                          }}>
                          {o.comfort_trans[0].name}
                        </Text>
                        <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                      </View>
                    ))}
                  </View>
                ) : (
                    <Text></Text>
                  )}
                {listing.comforts.kitchens !== undefined && listing.comforts.kitchens.length ? (
                  <View
                    style={{
                      marginBottom: hp('3%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {t('details:kitchen')}
                    </Text>
                    {listing.comforts.kitchens.map((o: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          width: wp('90%'),
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#484848',
                            textAlignVertical: 'center',
                          }}>
                          {o.comfort_trans[0].name}
                        </Text>
                        <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                      </View>
                    ))}
                  </View>
                ) : (
                    <Text></Text>
                  )}
                {listing.comforts.entertainment !== undefined &&
                  listing.comforts.entertainment.length ? (
                    <View
                      style={{
                        marginBottom: hp('3%'),
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '700',
                        }}>
                        {t('details:entertainment')}
                    </Text>
                      {listing.comforts.entertainment.map((o: any, i: number) => (
                        <View
                          key={i}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            width: wp('90%'),
                            marginVertical: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#484848',
                              textAlignVertical: 'center',
                            }}>
                            {o.comfort_trans[0].name}
                          </Text>
                          <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text></Text>
                  )}
                {listing.comforts.common !== undefined && listing.comforts.common.length ? (
                  <View
                    style={{
                      marginBottom: hp('3%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {t('details:common')}
                    </Text>
                    {listing.comforts.common.map((o: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          width: wp('90%'),
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#484848',
                            textAlignVertical: 'center',
                          }}>
                          {o.comfort_trans[0].name}
                        </Text>
                        <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                      </View>
                    ))}
                  </View>
                ) : (
                    <Text></Text>
                  )}
                {listing.comforts.others !== undefined && listing.comforts.others.length ? (
                  <View
                    style={{
                      marginBottom: hp('3%'),
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      {t('details:others')}
                    </Text>
                    {listing.comforts.others.map((o: any, i: number) => (
                      <View
                        key={i}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          width: wp('90%'),
                          marginVertical: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#484848',
                            textAlignVertical: 'center',
                          }}>
                          {o.comfort_trans[0].name}
                        </Text>
                        <SvgUri width="28" height="28" source={{ uri: o.icon }} />
                      </View>
                    ))}
                  </View>
                ) : (
                    <Text></Text>
                  )}
              </View>
            </ScrollView>
          </Modal>
        ),
        [collapsedComfort],
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  txtTitle: {
    fontSize: SIZE_TEXT_TITLE,
    marginBottom: hp('2%'),
    fontWeight: '600',
    color: COLOR_TEXT_TITLE,
  },
  txtDescription: {
    fontSize: 16,
    fontWeight: '500',
  },
});
BoxAmenitiesRoom.defaultProps = {};
export default BoxAmenitiesRoom;
