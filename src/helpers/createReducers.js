export default (initialState, actionHandlers) => (state = initialState, action) => {
  const actionType = action.type;

  return actionHandlers[actionType] ? actionHandlers[actionType](state, action) : state;
};
