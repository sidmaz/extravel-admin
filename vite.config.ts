import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // ✅ Vite will look for .tsx first, then .ts, before ever looking at .js
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  }
})
