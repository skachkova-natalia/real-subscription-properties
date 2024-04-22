import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import path from "path";

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components'),
            'constants': path.resolve(__dirname, './src/constants'),
            'core': path.resolve(__dirname, './src/core'),
            'models': path.resolve(__dirname, './src/models'),
            'pages': path.resolve(__dirname, './src/pages'),
            'services': path.resolve(__dirname, './src/services'),
            'types': path.resolve(__dirname, './src/types'),
            'ui-kit': path.resolve(__dirname, './src/ui-kit'),
            'utils': path.resolve(__dirname, './src/utils'),
        },
    },
    plugins: [
        react(),
        VitePWA({
            base:'./',
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico'],
            manifest: {
                name: 'Real Substance Properties',
                short_name: 'RSP',
                description: 'Real substance properties',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-64x64.svg',
                        sizes: '64x64',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-192x192.svg',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.svg',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ]
            }
        })
    ],
    build: {
        outDir: 'build',
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output:{
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    },
})
