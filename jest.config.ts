import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: [
        // AJB: feel free to add other pattern matchers here
        '**/__tests__/**/*.spec.ts',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: [
        "node_modules"
    ],
};

export default config;