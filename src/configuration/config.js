
const config = {
  local: {
    "javaScriptKey":"39c0f53356e324929bb78bd27b69bb6b",
    "cognitoInfo":{
      REGION: 'ap-northeast-2',
      USER_POOL_ID: 'ap-northeast-2_CHGQe7flY',
      CLIENT_ID: '29ilv9idglfh0spnbe9tpfb19m',
    }
  },
  dev: {
  },
  qa: {
    "javaScriptKey":"e9c4b1d97b8bac697985d17eb59516b3",
    "cognitoInfo":{
      REGION: 'ap-northeast-2',
      USER_POOL_ID: 'ap-northeast-2_VEcauCPn5',
      CLIENT_ID: '607q47715iim5ocmvlsphflurk',
    }
  },
  prod: {},
  default: {}
}

exports.get = function get(env) {
  return config[env] || config.default;
}
