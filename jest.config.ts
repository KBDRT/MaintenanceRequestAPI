import type { Config } from 'jest';

const shared = {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  // testMatch: ['<rootDir>/test/**/*.test.ts'],
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
  // setupFiles: ['<rootDir>/test/setup-env.ts'],
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
      globalSetup: '<rootDir>/test/integration/global-setup.ts',
      // globalTeardown: '<rootDir>/test/integration/global-teardown.ts',
      // setupFiles: ['<rootDir>/test/integration/setup-env.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/integration/setup.ts'],       
      testTimeout: 60_000,
    },
  ],
};

export default config;