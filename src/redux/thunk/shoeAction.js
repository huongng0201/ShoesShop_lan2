import axios from 'axios';
import {
  requestListShoeSuccess,
  requestListShoeFailed,
  requestDetailShoeSuccess,
  requestDetailShoeFailed,
} from '../actions/shoeAction';

export const requestListShoes = () => {
  return async dispatch => {
    //call API
    try {
      //success => save response to store
      const response = await axios({
        method: 'GET',
        url: 'http://svcy3.myclass.vn/api/Product',
      });
      dispatch(requestListShoeSuccess(response.data));
    } catch (error) {
      //failed => log error
      console.log(error);
      dispatch(requestListShoeFailed(error));
    }
  };
};