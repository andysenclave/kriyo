// apiConfig.ts
// Centralized API config using environment variables

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_MY_TASKS_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_TASKS_URL || '';
const API_USERS_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_USERS_URL || '';

const apiConfig = Object.freeze({
  baseUrl: API_BASE_URL,
  myTasksUrl: API_MY_TASKS_URL,
  usersUrl: API_USERS_URL,
});

export default apiConfig;
