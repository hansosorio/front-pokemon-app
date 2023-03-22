module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  coverageDirectory: './coverage/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'node'],
  transform: {
    '.+\\.(png|svg|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'dist',
    '<rootDir>/dist',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(.+)/dist/mds\\.svg\\?([a-z-]+)': 'jest-transform-stub',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    "<rootDir>/__test__/**/*.(test).{js,jsx,ts,tsx}",
    "<rootDir>/__test__/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/__templates__/'],
  coverageReporters: ['lcov', 'text'],
  collectCoverageFrom: [
    '**/src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!coverage/**',
    '!**/src/_config/**',
    '!**/src/+(index.js|module.js|set-public-path.js)',
  ],
  globals: {
    'vue-jest': {
      hideStyleWarn: true,
    },
  },
};
