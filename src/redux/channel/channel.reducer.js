import * as Types from "./channel.types";

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
};
const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_CHANNEL:
      return {
        currentChannel: action.payload,
        isPrivateChannel: false,
      };
    default:
      return state;
  }
};

export default channel_reducer;
