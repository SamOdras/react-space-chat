import * as Types from './auth.types';

const initialUserState = {
  currentUser: null, 
  isLoading: true,
};
const user_reducer = (state = initialUserState,action) => {
  switch(action.type){
    case Types.SET_USER:
      return {
        currentUser : action.payload,
        isLoading: false,
      }
    case Types.CLEAR_USER:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
}

export default user_reducer;