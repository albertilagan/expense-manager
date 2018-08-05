import { EXPENSES_API, FETCH_EXPENSES, NEW_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../constants';
import { api } from './../helpers/api.helper';

export const fetchExpenses = () => dispatch => {
  api.get(EXPENSES_API.fetch)
    .then(res => {
      dispatch({
        type: FETCH_EXPENSES,
        payload: res.data
      })
    });
}

export const createExpense = (payload) => dispatch => {
  api.post(EXPENSES_API.create, payload)
    .then(res => dispatch({
      type: NEW_EXPENSE,
      payload: res.data
    }));
}

export const updateExpense = (payload) => dispatch => {
  api.put(EXPENSES_API.update, payload._id, payload)
    .then(res => dispatch({
      type: UPDATE_EXPENSE,
      payload: res.data
    }));
}

export const deleteExpense = (payload) => dispatch => {
  api.delete(EXPENSES_API.delete, payload._id)
    .then(res => dispatch({
      type: DELETE_EXPENSE,
      payload: res.data
    }));
}