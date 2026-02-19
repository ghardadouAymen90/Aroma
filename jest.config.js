const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/application/(.*)$': '<rootDir>/lib/application/$1',
    '^@/infrastructure/(.*)$': '<rootDir>/lib/infrastructure/$1',
    '^@/presentation/(.*)$': '<rootDir>/lib/presentation/$1',
    '^@/domain/(.*)$': '<rootDir>/lib/domain/$1',
    '^@/hooks/(.*)$': '<rootDir>/lib/presentation/hooks/$1',
    '^@/components/(.*)$': '<rootDir>/lib/presentation/components/$1',
    '^@/stores/(.*)$': '<rootDir>/lib/application/stores/$1',
    '^@/utils/(.*)$': '<rootDir>/lib/utils/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testPathIgnorePatterns: [
    '/__tests__/utils/jwt.test.ts',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
