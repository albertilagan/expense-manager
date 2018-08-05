import { CATEGORIES_API, FETCH_CATEGORIES, NEW_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../constants';
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

export const updateCategory = (payload) => dispatch => {
  api.put(CATEGORIES_API.update, payload._id, payload)
    .then(res => dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data
    }));
}

export const deleteCategory = (payload) => dispatch => {
  api.delete(CATEGORIES_API.delete, payload._id)
    .then(res => dispatch({
      type: DELETE_CATEGORY,
      payload: res.data
    }));
}