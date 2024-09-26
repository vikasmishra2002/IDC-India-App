
import Config from 'react-native-config'; 
import axios from 'axios';
import { store } from '../Redux/store';

const REACT_APP_BASEURL = Config.REACT_APP_BASEURL || "https://idc-india-update.onrender.com/api/v1";

console.log(REACT_APP_BASEURL, "REACT_APP_BASEURL"); 


export const withoutAuthAxios = () => {
  console.log('Base URL:', REACT_APP_BASEURL); 
  return axios.create({
    baseURL: REACT_APP_BASEURL,
  });
};

export const authAxios = () => {
  
  const token = store.getState().auth.accessToken;

  console.log('Redux State:', store.getState()); 
  console.log('Auth Token:', token); 

  return axios.create({
    baseURL: REACT_APP_BASEURL,
    headers: {
      'Authorization': token ? `Bearer ${token}` : '', 
    },
  });
};
