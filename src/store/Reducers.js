import { UPDATE_TASK_ENTRIES } from "./Actions";
import {combineReducers} from 'redux';

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

// const rootReducer = combineReducers({
//     task: taskReducer,
//   });
  
//   export default rootReducer;

export default taskReducer;
