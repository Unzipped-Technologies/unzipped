/** @format */

//dev keys here
module.exports = {
  env: 'localhost',
  //google
  googleClientID: '510901918774-aq8e215rtmogvfj7bnv1pkeonq543utq.apps.googleusercontent.com',
  googleClientSecret: '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',
  googleApiKey: 'AIzaSyDtayOFbb3R-I_0lwlhCovFDBZJzc4K_4k',
  //database
  mongoURI:
    'mongodb://jason123:Myfirst1@contactkeeper-shard-00-00.n6tza.mongodb.net:27017,contactkeeper-shard-00-01.n6tza.mongodb.net:27017,contactkeeper-shard-00-02.n6tza.mongodb.net:27017/?replicaSet=atlas-68rw1e-shard-0&ssl=true&authSource=admin',
  // 'mongodb+srv://jason123:Welcome75$#31@contactkeeper.n6tza.mongodb.net/?retryWrites=true&w=majority',
  // `mongodb+srv://DeveloperAccount:7CELAMCzusr89y@cluster1.szxtq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  CLOUDINARY_URL: 'cloudinary://367721181168573:LDo3thl241Z86yWH59SVb0dU5H4@dghsmwkfq',
  CloudName: 'dghsmwkfq',
  CloudinaryAPIKey: '367721181168573',
  CloudinarySecretKey: 'LDo3thl241Z86yWH59SVb0dU5H4',
  // aws config
  region: 'us-east-1',

  cookieKey: '1Xxp382GgnXxYz49528',
  //payment
  stripePublishableKey:
    'pk_test_51N8neBKbRhZhJxMgyOpWY0pyTFdJ9rb9mIIgjor3IaCfRwU5IGCP00Q9aWH629MCbML22vJg7AVOE3Etm9vk4lUs00cMojHSRC',
  stripeSecretKey:
    'sk_test_51N8neBKbRhZhJxMgqn7xtwILzeKZPoobbygMQzxUeAFKi3D2ldnUXCsDiaGfdQOH4oALxxXcEIZXlQ3887et74cu00YBfjyyZM',
  sendGridKey: process.env.SEND_GRID_KEY,
  sendGridName: 'Unzipped',
  sendGridEmail: 'Jason@unzipped.io',
  redirectDomain: 'http://localhost:3000',
  nextPublicGAID: 'UA-183226924-1',
  carsXe: 'b4pbu5nbd_te7e4y4dl_zlbdt9z1u',
  googleMapsId: 'AIzaSyAQ1qG76xzdshhnR_mef1vf-2PcFa6anw0',
  googlePlacesId: 'ChIJpbtkDCSPOIgR9X-9avZuqbg',
  facebookID: '384791752906464',
  facebookAPI:
    'EAAHeZAVRhGZC8BAHu6ZCf2RGtph4nztDpDDJ4QqxElVNWCBa1rZBi2uqOhmGZA9IvyedXdW1rUy2x1OQSoM2wEcODpKmZBF0pR1nhdJUnqps5yCH7xSYS8ApTZAzqK7AjwTpKZAcjqhU97i3ONjCBrDE3r4YMlZAt3MALTywfPgBLVZC283n4ZAoMSQ',
  nextPublicGithubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '509d38179ddfee75d61f',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '30a2ea2b0796b6092f825f80680a608ff57d5e9e',
  githubRedirectUrl: process.env.GITHUB_REDIRECT_URL || 'http://localhost:3000/api/auth/github',
  socketUrl: process.env.SOCKET_URL || 'http://localhost:3000'
}
