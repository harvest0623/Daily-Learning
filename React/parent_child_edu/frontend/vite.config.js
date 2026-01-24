import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/dist/',
    plugins: [react()],
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://47.118.25.23:3000',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ''),
    //             secure: true
    //         }
    //     }
    // }
})
