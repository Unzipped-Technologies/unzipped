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
  CLOUDINARY_URL: 'cloudinary://367721181168573:LDo3thl241Z86yWH59SVb0dU5H4@dghsmwkfq',
  CloudName: 'dghsmwkfq',
  CloudinaryAPIKey: '367721181168573',
  CloudinarySecretKey: 'LDo3thl241Z86yWH59SVb0dU5H4',
  // aws config
  region: 'us-east-1',

  cookieKey: '1Xxp382GgnXxYz49528',
  //payment
  stripePublishableKey:
    'pk_test_51M4xI7HVpfsarZmBjdvRszIxG3sAlt3nG0ewT8GKm3nveinFofkmwQPwsw50xvuJMIMZ6yFnhuCDg5hSsynmKdxw00ZGY72yog',
  stripeSecretKey:
    'sk_test_51M4xI7HVpfsarZmB00kaNw3rrH722ddi84qWASUSAkFFM7ACHxhxAiQ8I3tzeOdwjSMI0oRxbLP5FGkFm9HnDwPX00pcXTtQB4',
  stripeClientId: 'ca_PfJUA8aC0UA53v2zmIRQ6Se4V6qh3jmm',
  stripeSigningSecret: 'whsec_20e88d86a51726a7e1b7d93425a5c540116f06cea126a8e3ca75342f616cdd3b',
  sendGridKey: process.env.NEXT_PUBLIC_SEND_GRID_KEY,
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
  socketUrl: process.env.ENV == 'local' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_SOCKET_URL ,
  supportEmail: 'jason+support@unzipped.io',
  supportAccountPassword: 'Myfirst1',
  supportFirstName: 'Unzipped',
  supportLastName: 'Support',
  supportFullName: 'Unzipped Support',
  supportRole: 2
}
