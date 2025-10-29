import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import { defineConfig, loadEnv } from 'vite'

// export default defineConfig({
//   plugins: [vue(), tailwindcss(), svgLoader()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('VITE_API_URL seen by Vite:', env.VITE_API_URL)
  return {
    plugins: [vue(), tailwindcss(), svgLoader()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
