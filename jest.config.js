module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^~/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['js', 'vue', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/store/**/*.(vue|js)'],
};
