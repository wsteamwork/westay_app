import React, {FC, useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CreateListingLayout from 'components/Host/CreateListingLayout';
import {useTranslation} from 'react-i18next';
import {SIZE_TEXT_CONTENT, SIZE_TEXT_TITLE} from 'styles/global.style';
import BoxSelectComfort from 'components/Host/CreateListing/Step2/Tab2_Comfort/BoxSelectComfort';
import {useSelector, useDispatch} from 'react-redux';
import {ReducersList} from 'store/redux/reducers';
import {getDataImages, ImageReducerAction} from 'store/redux/reducers/Merchant/CreateListing/Step2/images';
import {AxiosRes} from 'types/ResponseTemplate';
import {getDataAmenities, AmenitiesReducerAction} from 'store/redux/reducers/Merchant/CreateListing/Step2/amenities';
import {axios_merchant} from 'utils/api';
import {DetailsReducerAction} from 'store/redux/reducers/Merchant/CreateListing/Step2/details';
import {Dispatch} from 'redux';
import {AuthContext} from 'store/context/auth';
import LottieView from 'lottie-react-native';

interface IProps {

}

const Tab2_Comfort: FC<IProps> = (props) => {
  const {}                        = props;
  const {t}                       = useTranslation();
  const {state}                   = useContext(AuthContext);
  const {languageStatus}          = state;
  const [amenities, setAmenities] = useState<any>([]);
  const dispatch_detail           = useDispatch<Dispatch<DetailsReducerAction>>();
  const dispatch_amen             = useDispatch<Dispatch<AmenitiesReducerAction>>();
  const dispatch_img              = useDispatch<Dispatch<ImageReducerAction>>();
  const outdoorsClick             = useSelector<ReducersList, number[]>((state) => state.amenities.outdoors);
  const facilitiesClick           = useSelector<ReducersList, number[]>((state) => state.amenities.facilities);
  const bathroomsClick            = useSelector<ReducersList, number[]>((state) => state.amenities.bathrooms);
  const kitchensClick             = useSelector<ReducersList, number[]>((state) => state.amenities.kitchens);
  const entertainmentClick        = useSelector<ReducersList, number[]>((state) => state.amenities.entertainment);
  const othersClick               = useSelector<ReducersList, number[]>((state) => state.amenities.others);
  const livingRoomClick           = useSelector<ReducersList, number[]>((state) => state.amenities.livingrooms);
  const bedroomClick              = useSelector<ReducersList, number[]>((state) => state.amenities.bedrooms);
  const id                        = 12786;

  const getAmenitiesList = async () => {
    const url                = `comforts`;
    const res: AxiosRes<any> = await axios_merchant.get(url, {
      headers: {'Accept-Language': languageStatus},
    });
    setAmenities(res.data);
  };

  useEffect(() => {
    dispatch_detail({type: 'setStep', payload: 'tab2'});
    getDataAmenities(id, dispatch_amen);
    getDataImages(id, dispatch_img);
  }, []);

  useEffect(() => {
    if (!amenities.length) {
      getAmenitiesList();
    }
  }, [languageStatus]);

  const viewLoading  = () => {
    return (
      <View style = {styles.boxSelect}>
        <LottieView
          source = {require('assets/lottie/loading1.json')}
          autoPlay
        />
      </View>
    );
  };
  const loadingCompo = viewLoading();

  return (
    <CreateListingLayout titleHeader = {t('create_details:titleStep')} titleMain = {t('create_basic:tab2')}>
      <View style = {styles.row}>
        <Text style = {styles.txtTitle}>{t('create_details:amenities:titleAmenities')}</Text>
        <Text style = {styles.txtSubTitle}>{t('create_details:amenities:subTitleAmenities')}</Text>
      </View>
      <View style = {styles.row}>
        {amenities['facilities'] ? (
          <BoxSelectComfort
            label = {amenities['facilities'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelFacilities')}
            amenities = {amenities['facilities']}
            dataClick = {facilitiesClick}
            typeUpload = {{type: 'setFacilities'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['livingrooms'] ? (
          <BoxSelectComfort
            label = {amenities['livingrooms'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelFacilities')}
            amenities = {amenities['livingrooms']}
            dataClick = {livingRoomClick}
            typeUpload = {{type: 'setLivingRooms'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['bathrooms'] ? (
          <BoxSelectComfort
            label = {amenities['bathrooms'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelBathrooms')}
            amenities = {amenities['bathrooms']}
            dataClick = {bathroomsClick}
            typeUpload = {{type: 'setBathRooms'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['bedrooms'] ? (
          <BoxSelectComfort
            label = {amenities['bedrooms'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelFacilities')}
            amenities = {amenities['bedrooms']}
            dataClick = {bedroomClick}
            typeUpload = {{type: 'setBedRooms'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['kitchens'] ? (
          <BoxSelectComfort
            label = {amenities['kitchens'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelKitchens')}
            amenities = {amenities['kitchens']}
            dataClick = {kitchensClick}
            typeUpload = {{type: 'setKitchens'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['entertainments'] ? (
          <BoxSelectComfort
            label = {amenities['entertainments'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelEntertainments')}
            amenities = {amenities['entertainments']}
            dataClick = {entertainmentClick}
            typeUpload = {{type: 'setEntertainment'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['outdoors'] ? (
          <BoxSelectComfort
            label = {amenities['outdoors'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelOutdoors')}
            amenities = {amenities['outdoors']}
            dataClick = {outdoorsClick}
            typeUpload = {{type: 'setOutdoors'}}
          />
        ) : loadingCompo}
      </View>
      <View style = {styles.row}>
        {amenities['others'] ? (
          <BoxSelectComfort
            label = {amenities['others'][0].type_txt}
            sub_label = {t('create_details:amenities:subLabelOtherAmen')}
            amenities = {amenities['others']}
            dataClick = {othersClick}
            typeUpload = {{type: 'setOthers'}}
          />
        ) : loadingCompo}
      </View>
    </CreateListingLayout>
  );
};

const styles = StyleSheet.create({
  txtTitle: {
    fontSize: SIZE_TEXT_TITLE,
    marginBottom: 6,
  },
  row: {
    marginBottom: 32,
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
  },
});

export default Tab2_Comfort;
