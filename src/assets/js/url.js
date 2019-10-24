const INTERFACE = {
  LOGIN: 'sysUser/login',
  GET_USER_LIST: 'sysUser/list',
  GET_USER_INFO: 'sysUser/getUserInfo'
}

function getUrl (key) {
  return INTERFACE[key]
}

export default getUrl
