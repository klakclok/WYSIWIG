import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from '@rollup/plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }), enforce: 'pre' },
    ],
    build: {
        rollupOptions: {},
    },
})
