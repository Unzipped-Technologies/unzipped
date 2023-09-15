const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  images: {
    domains: ['s3.amazonaws.com', 'res.cloudinary.com'],
  },
  // Other Next.js configuration options go here if needed
};

module.exports = withPlugins([
  [
    withSass,
    {
      cssLoaderOptions: {
        importLoaders: 2,
      },
    },
  ],
  withOffline,
  [
    optimizedImages,
    {
      optimizeImagesInDev: true,
    },
  ],
  withImages,
], nextConfig);
