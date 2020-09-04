import * as Types from './auth.types';

export const setUser = user => ({
  type: Types.SET_USER,
  payload: user,
})

export const clearUser = () => {
  localStorage.removeItem('UID');
  return {
    type: Types.CLEAR_USER
  }
}

export const signIn = userUID => {
  localStorage.setItem('UID', userUID);
  return {
    type: Types.SIGN_IN
  }
}
