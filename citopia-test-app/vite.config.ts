import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
     globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/setup.ts",
    coverage: {
      provider: 'v8',
      reporter: ["text", "json", "html"],
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["node_modules/", "src/tests/setup.ts"]
    }
  },
});
