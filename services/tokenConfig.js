import { getCookie } from './cookie'

export const tokenConfig = (token, formType) => {
  // Get token from localstorage
  // const token = localStorage.getItem('access_token');//getState().Auth.token//localStorage.getItem('token');
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    },
    // method: 'GET',
    credentials: 'include'
  }
  if (formType === 'multipart') {
    config.headers['Content-type'] = 'multipart/form-data'
  }
  // let authCookie;
  // if (typeof localStorage !== "undefined") {
  //   authCookie = getCookie('access_token');
  // } else { authCookie = undefined}

  config.headers['access_token'] = token

  // console.log(authCookie)

  return config
}
