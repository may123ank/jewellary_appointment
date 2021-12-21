module.exports = {
  reactStrictMode: true,
  target: "serverless",
  eslint: { ignoreDuringBuilds: true },
  devIndicators: {
    autoPrerender: false,
  },
}
const withImages = require('next-images')
module.exports = withImages()

module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, 
      fs: false,
    };

    return config;
  },
};
