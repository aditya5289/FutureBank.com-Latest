// action types
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// action creator
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user,
});
