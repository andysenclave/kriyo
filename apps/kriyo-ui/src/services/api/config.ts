// Centralized API config using environment variables

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_MY_TASKS_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_TASKS_URL || '';
const ADD_MY_TASK_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_ADD_MY_TASK_URL || '';
const API_USERS_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_USERS_URL || '';

const config = Object.freeze({
  baseUrl: API_BASE_URL,
  myTasksUrl: API_MY_TASKS_URL,
  addMyTask: ADD_MY_TASK_URL,
  usersUrl: API_USERS_URL,
});

export default config;
