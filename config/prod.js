// prod.js - production keys here!!
console.log('prod.js => SOCKET_URL', process.env.NEXT_PUBLIC_SOCKET_URL)
console.log('app_enviroment', process.env.ENV)
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeClientId: process.env.STRIPE_CLIENT_ID,
  region: process.env.REGION,
  env: process.env.ENV,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
  nextPublicGAID: process.env.NEXT_PUBLIC_GA_ID,
  carsXe: process.env.CARS_XE_API_KEY,
  stripeSigningSecret: process.env.STRIPE_SIGNING_SECRET,
  facebookID: process.env.FACEBOOK_ID,
  googleMapsId: process.env.GOOGLE_MAPS_ID,
  facebookAPI: process.env.FACEBOOK_API,
  nextPublicGithubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubRedirectUrl: process.env.GITHUB_REDIRECT_URL,
  sendGridName: 'Unzipped',
  sendGridEmail: 'Jason@unzipped.io',
  nextPublicGithubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '509d38179ddfee75d61f',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '30a2ea2b0796b6092f825f80680a608ff57d5e9e',
  githubRedirectUrl: process.env.GITHUB_REDIRECT_URL || 'http://localhost:3000/api/auth/github',
  socketUrl:  process.env.NEXT_PUBLIC_SOCKET_URL 
}
