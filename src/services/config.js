import Config from 'react-native-config';
import axios from 'axios';
import { store } from '../Redux/store';


REACT_APP_BASEURL="http://10.0.2.2:5000/api/v1"
console.log(REACT_APP_BASEURL,"REACT_APP_BASEURLREACT_APP_BASEURLREACT_APP_BASEURL")


export const withoutAuthAxios = () => {
  console.log('Base URL:', REACT_APP_BASEURL); 
  return axios.create({
    baseURL: REACT_APP_BASEURL,
  });
};

export const authAxios = () => {
  let token = store.getState().auth.accessToken;
  console.log('Redux State:', store.getState());
  console.log('Auth Token:', token);
  return axios.create({
    baseURL: REACT_APP_BASEURL,
    headers: {
      'Authorization': `${token ? `${token}` : null}`,
    },
  });
};
