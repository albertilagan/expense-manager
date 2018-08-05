import { CATEGORIES_API, FETCH_CATEGORIES, NEW_CATEGORY } from '../constants';
import { api } from './../helpers/api.helper';

export const fetchCategories = () => dispatch => {
  api.get(CATEGORIES_API.fetch)
    .then(res => {
      dispatch({
        type: FETCH_CATEGORIES,
        payload: res.data
      })
    });
}

export const createCategory = (payload) => dispatch => {
  api.post(CATEGORIES_API.create, payload)
    .then(res => dispatch({
      type: NEW_CATEGORY,
      payload: res.data
    }));
}