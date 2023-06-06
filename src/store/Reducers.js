import { UPDATE_TASK_ENTRIES } from "./taskActions";

const initialState = {
  entries: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TASK_ENTRIES:
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
