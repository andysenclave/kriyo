// Centralized API config using environment variables

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL || '';
const API_MY_TASKS_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_TASKS_URL || '';
const ADD_MY_TASK_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_ADD_MY_TASK_URL || '';
const API_USERS_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_USERS_URL || '';
const LOGIN_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_LOGIN_URL || '';
const SIGNUP_URL = process.env.NEXT_PUBLIC_KRIYO_UI_API_SIGNUP_URL || '';

// Other constants
const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'kriyo_auth_token';
const USER_KEY = process.env.NEXT_PUBLIC_USER_KEY || 'kriyo_user';

const config = Object.freeze({
  baseUrl: API_BASE_URL,
  authBaseUrl: API_AUTH_BASE_URL,
  myTasksUrl: API_MY_TASKS_URL,
  addMyTask: ADD_MY_TASK_URL,
  usersUrl: API_USERS_URL,
  loginUrl: LOGIN_URL,
  signupUrl: SIGNUP_URL,
  authTokenKey: AUTH_TOKEN_KEY,
  userKey: USER_KEY,
});

export default config;
