import { FETCH_EXPENSES, NEW_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from './../constants';

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
        items: [...state.items, action.payload],
        item: action.payload
      });
    case UPDATE_EXPENSE:
      return Object.assign({}, state, {
        items: state.items.map(itm => {
          if (itm._id === action.payload._id) {
            return action.payload;
          }
          return itm;
        }),
        item: action.payload
      });
    case DELETE_EXPENSE:
      return Object.assign({}, state, {
        items: state.items.filter(itm => itm._id != action.payload._id)
      });
    default:
      return state;
  }
}