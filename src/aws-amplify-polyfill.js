// Polyfill global object for AWS Amplify to work properly with Vite
window.global = window;
window.process = {
  env: { DEBUG: undefined },
};
window.Buffer = window.Buffer || require('buffer').Buffer; 