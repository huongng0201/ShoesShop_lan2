import {mapLocalHostToIP} from '../../utils';
import {
  REQUEST_LIST_SHOE_SUCCESS,
  REQUEST_DETAIL_SHOE_SUCCESS,
} from '../actions/shoeAction';

const initialState = {
  listShoe: [],
  shoe: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_LIST_SHOE_SUCCESS:
      return {...state, listShoe: mapLocalHostToIP(payload)};
    case REQUEST_DETAIL_SHOE_SUCCESS:
      console.log(payload);
      return {...state, shoe: mapLocalHostToIP(payload)};
    default:
      return state;
  }
};
