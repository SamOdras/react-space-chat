import * as Types from './channel.types';

export const setCurrentChannel = channel => ({
  type: Types.SET_CURRENT_CHANNEL,
  payload: channel
})