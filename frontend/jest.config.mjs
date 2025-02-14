export default {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',  // Maps @ to the src folder
    },
    transform: {
        '^.+\.(ts|tsx)$': [
            'ts-jest',
// Tell ts-jest to compile TypeScript as ESM
            {
                useESM: true,
            },
        ],
    },
// Instruct Jest to treat TS files as ESM
    extensionsToTreatAsEsm: ['.ts', '.tsx'],

// If needed, transpile dayjs from node_modules:
transformIgnorePatterns: ['node_modules/(?!dayjs)'],
};