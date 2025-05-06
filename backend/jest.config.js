module.exports = {
    setupFiles: ['./jest.setup.js'],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
      },
    transformIgnorePatterns: [
        '/node_modules/(?!axios)/',  // tell Jest to process 'axios' with Babel
      ],
};