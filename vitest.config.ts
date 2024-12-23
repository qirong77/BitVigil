/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    testTimeout: 1000 * 60 * 10
  }
})
