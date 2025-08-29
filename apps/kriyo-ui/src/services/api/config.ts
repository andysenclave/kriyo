const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || '';
const API_AUTH_BASE_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL || '';
const KRIYO_API_BASE_URL = process.env.NEXT_PUBLIC_KRIYO_API_BASE_URL || '';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

// Other constants
const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || 'kriyo_auth_token';
const USER_KEY = process.env.NEXT_PUBLIC_USER_KEY || 'kriyo_user';

const config = Object.freeze({
  appBaseUrl: APP_BASE_URL,
  authBaseUrl: API_AUTH_BASE_URL,
  apiBaseUrl: KRIYO_API_BASE_URL,

  authTokenKey: AUTH_TOKEN_KEY,
  userKey: USER_KEY,

  clientId: CLIENT_ID,
});

export default config;
