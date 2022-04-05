import {postRequest} from './request';

export interface User {
  name: string;
  email: string;
  password: string;
  branch: string;
  sem: number;
}

export const apiEndpoint = 'https://satva-server.herokuapp.com/';

export async function registerUser(
  username: string,
  email: string,
  password: string,
  branch: string,
  sem: number,
  adminPass: string,
) {
  try {
    const response = await postRequest(apiEndpoint + 'user/register', {
      name: username,
      email: email,
      password: password,
      branch: branch,
      sem: sem,
      adminpass: adminPass,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerUser error', e);
    return null;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await postRequest(apiEndpoint + 'user/login', {
      email: email,
      password: password,
    });
    return response;
  } catch (e) {
    /* handle error */
    console.error('api::registerUser error', e);
    return null;
  }
}
