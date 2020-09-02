import * as Types from "./channel.types";

const initialChannelState = {
  currentChannel: null,
  isPrivateChannel: false,
  isStarredChannel: false, 
  userTotalPosts: null
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
    case Types.SET_STARRED_CHANNEL:
      return {
        ...state,
        isStarredChannel: action.payload
      }
    case Types.SET_USER_TOTAL_POSTS:
      return {
        ...state,
        userTotalPosts: action.payload
      }
    default:
      return state;
  }
};

export default channel_reducer;
