const config = {
  databaseURL: 'https://test-d60e6.firebaseio.com',
};

if (!config.databaseURL) {
  alert('請設定config');
}

export default config;
