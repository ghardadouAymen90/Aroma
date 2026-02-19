import '@testing-library/jest-dom'

// Add TextEncoder to global scope for jest
const { TextEncoder } = require('util');
Object.assign(global, { TextEncoder });

// Suppress React.act deprecation warning
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('ReactDOMTestUtils.act')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});