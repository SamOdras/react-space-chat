import * as Types from './channel.types';

export const setCurrentChannel = channel => ({
  type: Types.SET_CURRENT_CHANNEL,
  payload: channel
})

export const setPrivateChannel = payload => ({
  type: Types.SET_PRIVATE_CHANNEL,
  payload: payload
})

export const setStarredChannel = payload => ({
  type: Types.SET_STARRED_CHANNEL,
  payload: payload
})