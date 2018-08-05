import { FETCH_CATEGORIES, NEW_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './../constants';

const initialState = {
  items: [],
  item: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return Object.assign({}, state, {
        items: action.payload
      });
    case NEW_CATEGORY:
      return Object.assign({}, state, {
        items: [...state.items, action.payload],
        item: action.payload
      });
    case UPDATE_CATEGORY:
      return Object.assign({}, state, {
        items: state.items.map(itm => {
          if (itm._id === action.payload._id) {
            return action.payload;
          }
          return itm;
        }),
        item: action.payload
      });
    case DELETE_CATEGORY:
      return Object.assign({}, state, {
        items: state.items.filter(itm => itm._id != action.payload._id)
      });
    default:
      return state;
  }
}