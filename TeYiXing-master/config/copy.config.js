const ionicEnv = process.env.IONIC_ENV || 'dev'

module.exports = {
  copySettings: {
    src: ['{{ROOT}}/environments/' + ionicEnv + '/settings.json'],
    dest: '{{WWW}}/assets',
  },
}
