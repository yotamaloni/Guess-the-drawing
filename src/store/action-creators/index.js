export const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: "SET_USER", user });
  };
};

export const setGameDone = (isGameDone) => {
  return (dispatch) => {
    dispatch({ type: "SET_GAME", isGameDone });
  };
};
