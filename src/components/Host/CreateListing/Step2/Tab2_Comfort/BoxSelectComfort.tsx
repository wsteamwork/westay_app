import React, {FC, useMemo, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {wp, hp} from 'utils/responsive';
import {SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE} from 'styles/global.style';
// @ts-ignore
import Checkbox from 'react-native-modest-checkbox';
import {useTranslation} from 'react-i18next';
import {AmenitiesIndexRes} from 'types/LTR/Amenities/AmenitiesResponses';
import {DetailsReducerAction} from 'store/redux/reducers/Merchant/CreateListing/Step2/details';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {AmenitiesReducerAction} from 'store/redux/reducers/Merchant/CreateListing/Step2/amenities';
import {Dispatch} from 'redux';

interface IProps {
  label: string,
  sub_label: string,
  amenities: AmenitiesIndexRes[],
  dataClick: number[],
  typeUpload: { type: string },
}

const BoxSelectComfort: FC<IProps> = (props) => {
  const { label, sub_label, amenities, dataClick, typeUpload } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const dispatch_detail = useDispatch<Dispatch<DetailsReducerAction>>();
  let countAmenities = useSelector<ReducersList, number>(
    (state) => state.amenities.count_amenities
  );
  const [newDataClick, setNewDataClick] = useState<number[]>(dataClick);
  const handleChange = (id: number, checked: boolean) => {
    if (checked === true) {
      setNewDataClick([...newDataClick, id]);
      // @ts-ignore
      dispatch({ type: typeUpload.type, payload: [...newDataClick, id] });
      dispatch({ type: 'setCountAmenities', payload: countAmenities + 1 });
    } else {
      let dataCheckboxUnCheck = newDataClick.filter((i) => i !== id);
      setNewDataClick(dataCheckboxUnCheck);
      // @ts-ignore
      dispatch({ type: typeUpload.type, payload: dataCheckboxUnCheck });
      dispatch({ type: 'setCountAmenities', payload: countAmenities - 1 });
    }
  };
  useEffect(() => {
    if (countAmenities < 10) {
      dispatch_detail({ type: 'setDisableNext', payload: true });
    } else {
      dispatch_detail({ type: 'setDisableNext', payload: false });
    }
  }, [countAmenities]);

  return useMemo(
    () => (
    <View style = {styles.container}>
      <Text style = {styles.txtTitle}>{label}</Text>
      <Text style = {styles.txtSubTitle}>{sub_label}</Text>
      <View style = {styles.boxSelect}>
        {amenities.map((o,index) => (
          <Checkbox
            key={index}
            uncheckedComponent = {
              <Ionicons
                name = {'checkbox-blank'}
                size = {wp('5%')}
                color={'#c1c1c1'}
              />
            }
            checkedComponent = {
              <Ionicons
                name = {'checkbox-marked'}
                size = {wp('5%')}
                color={'#008AE6'}
              />
            }
            checked = {newDataClick.some((x) => x === o.id)}
            onChange = {(value:any)=> handleChange(o.id, value.checked)}
            label = {o.comfort_trans[0].name}
            numberOfLabelLines = {2}
            noFeedback = {true}
            containerStyle = {{height: hp('6%'), width: '50%', paddingRight: 20}}
            labelStyle = {{fontSize:SIZE_TEXT_CONTENT}}
          />
        ))}
      </View>
    </View>
  ),[newDataClick, countAmenities]);
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  txtTitle: {
    fontSize: SIZE_TEXT_TITLE,
    marginBottom: 6,
    fontWeight:'700'
  },
  txtSubTitle: {
    fontSize: SIZE_TEXT_CONTENT,
  },
  boxSelect: {
    minHeight: 60,
    marginTop: 12,
    borderRadius: 6,
    width: '100%',
    backgroundColor: '#fafafa',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
});

export default BoxSelectComfort;
