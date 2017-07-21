import BuildUtils from 'utils/buildUtils';

export const SERVER_URL = BuildUtils.build.serverURL;

export const URL_GET_EX = `${SERVER_URL}/react-native/movies.json`;
export const URL_SIGN_IN = `${SERVER_URL}/oauth/token`;
