import vue from '@vitejs/plugin-vue'
const path = require('path');
import { defineConfig } from "vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		AutoImport({
			resolvers: [ElementPlusResolver()]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		})
	],
	// optimizeDeps: {
	// 	include: ['schart.js']
	// },
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		}
	},
	css: {
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
	
	server: {
		port:"8888",
		proxy: {
			// 使用 proxy 实例
			'^/v1': {
				target: 'http://www.zlgcloud.com/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/v1/, 'v1/')
			},
		}
	}
})