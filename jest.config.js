module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  reporters: [
    'default',
    'jest-html-reporters',
  ],
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/lib/setup-tests.ts'],
  testMatch: [
    '<rootDir>/src/**/*.{spec,user-stories}.{js,jsx,ts,tsx}',
  ],
  testPathIgnorePatterns: ['[/\\\\]dist[/\\\\].*$'],
  transform: {
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|json)$)': '<rootDir>/config/jest/fileTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  verbose: true,
  testEnvironment: 'jsdom'
};