module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/server.ts',
  ],
  modulePathIgnorePatterns: ['<rootDir>/src/server.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    'jestGlobalMocks.ts',
    '.module.ts',
    '<rootDir>/src/server.ts',
    '.mock.ts',
  ],
};
