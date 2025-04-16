module.exports = {
  preset: 'react-native',
  // Ignorer les dossiers node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|react-native-.*)/)'
  ],
  setupFiles: ['./jest.setup.js']
};
