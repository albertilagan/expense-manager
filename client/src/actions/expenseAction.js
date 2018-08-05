import { EXPENSES_API, FETCH_EXPENSES, NEW_EXPENSE } from '../constants';
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