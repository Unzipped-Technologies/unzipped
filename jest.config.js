// jest.config.js
module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  testTimeout: 10000, // Set the global timeout to 10 seconds (10000 milliseconds)
  testMatch: ['<rootDir>/__test__/**/*.test.(js|jsx)', '<rootDir>/__test__/**/*.spec.(js|jsx)']
}
