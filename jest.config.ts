import type { Config } from 'jest';

const shared = {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.json',
    }],
  },
};

const config: Config = {
  projects: [
    {
      ...shared,
      displayName: 'unit',
      testMatch: ['<rootDir>/test/unit/**/*.test.ts'],
    },

    {
      ...shared,
      displayName: 'integration',
      testMatch: ['<rootDir>/test/integration/**/*.test.ts'],
      globalSetup: '<rootDir>/test/integration/utils/global-setup.ts',
      setupFilesAfterEnv: ['<rootDir>/test/integration/utils/setup.ts', 'jest-fetch-mock/setup'],       
      testTimeout: 60_000,
    },
  ],
  maxWorkers: 1,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/migrations/**/*.ts',
    '!src/seeds/**/*.ts',
    '!src/srcripts/**/*.ts',
  ]
};

export default config;