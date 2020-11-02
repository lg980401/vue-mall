'use strict'
let ENV_CONFIG = '"dev"'
if (process.env.ENV_CONFIG === 'deprod') {
  ENV_CONFIG = '"deprod"'
} else if (process.env.ENV_CONFIG === 'build-test') {
  ENV_CONFIG = '"build-test"'
} else if (process.env.ENV_CONFIG === 'build-prod') {
  ENV_CONFIG = '"build-prod"'
} else if (process.env.ENV_CONFIG === 'build-dev') {
  ENV_CONFIG = '"build-dev"'
}
console.log(`${ENV_CONFIG}环境`)

module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG
}
