module.exports = {
  'secret':'nodeauthsecret',
  'database': process.env.MONGODB_URI || 'mongodb://localhost:27017/motoMaintenance'
};