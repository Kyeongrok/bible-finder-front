
const config = {
  local: {
    "javaScriptKey":"4dff7e0a4440d257e3ba040554b8d418",
    restApiKey:"cc0328e41a9f5bd8b1f36eaa9d381770",
    "cognitoInfo":{
      REGION: 'ap-northeast-2',
      USER_POOL_ID: 'ap-northeast-2_CHGQe7flY',
      CLIENT_ID: '29ilv9idglfh0spnbe9tpfb19m',
    }
  },
  dev: {
  },
  qa: {
    "javaScriptKey":"6e19bc158e7ddb45c3f2d1877ba79da8",
    restApiKey:"cc0328e41a9f5bd8b1f36eaa9d381770",
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
