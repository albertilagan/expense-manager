import { FETCH_EXPENSES, NEW_EXPENSE } from './../constants';

const initialState = {
  items: [],
  item: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSES:
      return Object.assign({}, state, {
        items: action.payload
      });
    case NEW_EXPENSE:
      return Object.assign({}, state, {
        item: action.payload
      });
    default:
      return state;
  }
}