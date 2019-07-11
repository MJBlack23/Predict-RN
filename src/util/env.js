import Constants from 'expo-constants'
import config from '../../config.json'

const ENV = {
  dev: {
    ...config,
  },
  staging: {
    ...config,
  },
  prod: {
    ...config,
  }
}

function getEnvVars(env = '') {
  switch (env) {
    case 'staging':
      return ENV.staging
    case 'prod':
      return ENV.prod

    default:
      return ENV.dev
  }
}

export default getEnvVars(Constants.manifest.releaseChannel)
