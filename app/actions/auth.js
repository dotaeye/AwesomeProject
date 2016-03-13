import * as authTypes from '../contants/auth';
import configs from '../configs'

export function loadProfile() {
  return {
    types: [authTypes.LOAD_PROFILE, authTypes.LOAD_PROFILE_SUCCESS, authTypes.LOAD_PROFILE_FAIL],
    promise: (client) => client.get('/account/profile', {
      token: true,
    })
  };
}
export function saveProfile(data) {
  return {
    types: [authTypes.SAVE_PROFILE, authTypes.SAVE_PROFILE_SUCCESS, authTypes.SAVE_PROFILE_FAIL],
    promise: (client) => client.post('/account/profile', {
      token: true,
      data: data
    })
  };
}

export function register(data) {
  return {
    types: [authTypes.REGISTER, authTypes.REGISTER_SUCCESS, authTypes.REGISTER_FAIL],
    promise: (client) => client.post('/account/register', {
      data: data
    })
  };
}

export function loadAuthToken(token) {
  return {
    type: authTypes.LOAD_AUTH_TOKEN,
    result: token
  }
}

export function login(data) {
  return {
    types: [authTypes.LOGIN, authTypes.LOGIN_SUCCESS, authTypes.LOGIN_FAIL],
    promise: (client) => client.post('/Token', {
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      saved: true,
      saveKey: configs.authToken
    })
  };
}


export function logout() {
  return {
    type: authTypes.LOGOUT_SUCCESS
  };
}