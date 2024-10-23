// jest.config.js
module.exports = {
  verbose: true,

  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/server/',
    '<rootDir>/redux/',
    '<rootDir>/utils/',
    '<rootDir>/components/ui/',
    '<rootDir>/components/icons/'
  ],

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/components/unzipped/(.*)$': '<rootDir>/components/unzipped/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': 'jest-css-modules-transform'
  },
  testTimeout: 100000, // Set the global timeout to 1 minutes (100000 milliseconds)
  testMatch: ['<rootDir>/__test__/**/*.test.(js|jsx)', '<rootDir>/__test__/**/*.spec.(js|jsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom'
}
