import * as Types from "./channel.types";

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
};
const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };
    case Types.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload,
      }
    default:
      return state;
  }
};

export default channel_reducer;
