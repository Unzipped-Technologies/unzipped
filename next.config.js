const withPlugins = require('next-compose-plugins')
const withOffline = require("next-offline")
const withImages = require('next-images')
const withSass = require("@zeit/next-sass")
const optimizedImages = require('next-optimized-images');



const nextConfig = {
    images: {
        domains: ['s3.amazonaws.com']
    }
}
// module.exports = withSass({
//     cssLoaderOptions: {
//       importLoaders: 2
//     }
//   });
module.exports = withOffline(
  withPlugins(
    [
      [withSass,
      {
        cssLoaderOptions: {
                importLoaders: 2
              }
      }
      ], 
      withOffline, 
      [optimizedImages,
        {
          optimizeImagesInDev: true
        }
      ]
    ], nextConfig))


