const initialState = {
  user: {
    username: null,
  },
  isGameDone: false,
};
export function reducer(state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case "SET_USER":
      console.log('sdf');
      newState = { ...state, user: { ...action.user } };
      break;
    case "SET_GAME":
      newState = { ...state, isGameDone: { ...action.isGameDone } };
      break;
    default:
  }
  return newState;
}
