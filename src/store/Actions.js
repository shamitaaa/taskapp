export const UPDATE_TASK_ENTRIES = "UPDATE_TASK_ENTRIES";

export const updateTaskEntries = (entries) => ({
  type: UPDATE_TASK_ENTRIES,
  payload: entries,
});
