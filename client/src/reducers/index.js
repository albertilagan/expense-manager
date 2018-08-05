import { combineReducers } from 'redux';
import expenseReducer from './expenseReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  expenses: expenseReducer,
  categories: categoryReducer
});