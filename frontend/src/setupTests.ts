// src/setupTests.ts
import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_BACKEND_URL = 'http://localhost:3001';

// Mock fetch if needed
global.fetch = jest.fn();

// Clean up after each test
afterEach(() => {
    jest.clearAllMocks();
});