import {SET_TOKEN, getProfile} from 'store/context/auth';
import {axios, TOKEN} from 'utils/api';
import storage from 'utils/storage';
import {Dispatch} from 'redux';

export const asyncLogin = (body:any, dispatch:Dispatch, fcmToken:string, languageStatus:string) => {
  return axios.post('login', body).then(async res => {
    const data = res.data;

    dispatch({ type: SET_TOKEN, payload: `Bearer ${data.access_token}` });

    await storage.save({
      key: TOKEN,
      data: data.access_token,
      expires: data.expires_in,
    });
    await saveFcmToken(fcmToken, `Bearer ${data.access_token}`);
    await getProfile(data.access_token, dispatch, languageStatus);
  });
};

const saveFcmToken = async (fcmToken:string, token:string) => {
  try {
    await axios.post(
      'tokens',
      { device_token: fcmToken },
      {
        headers: {
          Authorization: token,
        },
      },
    );
  } catch (error) {}
};
