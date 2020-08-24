import * as Types from './auth.types';

export const setUser = user => ({
  type: Types.SET_USER,
  payload: user,
})

export const clearUser = () => ({
  type: Types.CLEAR_USER
})