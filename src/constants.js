export const IS_TEST = false;

export const BASE_URL = "http://54.82.58.207:80";
// https://www.activebuildings.io/
// www.pirhoalpha.com
// export const BASE_URL = "https://www.pirhoalpha.com";
const SOCKET_BASE_URL_TEST = 'https://socket.test.sportvot.com/';
const SOCKET_BASE_URL_PROD = 'https://socket.sportvot.com/';

export const SOCKET_BASE_URL = IS_TEST
  ? SOCKET_BASE_URL_TEST
  : SOCKET_BASE_URL_PROD;
