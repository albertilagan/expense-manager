import { FETCH_CATEGORIES, NEW_CATEGORY } from './../constants';

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
        item: action.payload
      });
    default:
      return state;
  }
}