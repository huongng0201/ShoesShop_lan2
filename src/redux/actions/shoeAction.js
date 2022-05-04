export const REQUEST_LIST_SHOE_SUCCESS = 'REQUEST_LIST_SHOE_SUCCESS';
export const REQUEST_LIST_SHOE_FAILED = 'REQUEST_LIST_SHOE_FAILED';
export const REQUEST_DETAIL_SHOE_SUCCESS = 'REQUEST_DETAIL_SHOE_SUCCESS';
export const REQUEST_DETAIL_SHOE_FAILED = 'REQUEST_DETAIL_SHOE_FAILED';

export function requestListShoeSuccess(payload) {
  return {
    type: REQUEST_LIST_SHOE_SUCCESS,
    payload,
  };
}
export function requestListShoeFailed(payload) {
  return {
    type: REQUEST_LIST_SHOE_FAILED,
    payload,
  };
}

export function requestDetailShoeSuccess(payload) {
  return {
    type: REQUEST_DETAIL_SHOE_SUCCESS,
    payload,
  };
}
export function requestDetailShoeFailed(payload) {
  return {
    type: REQUEST_DETAIL_SHOE_FAILED,
    payload,
  };
}
