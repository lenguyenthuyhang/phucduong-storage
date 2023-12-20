import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const proxy_url =
    process.env.VITE_DEV_REMOTE === 'remote'
      ? process.env.VITE_BACKEND_SERVER
      : 'http://localhost:8888/';

  const config = {
    base: './',
    esbuild: {
      // drop: ['console', 'debugger'],
    },
    css: {
      // 开css sourcemap方便找css
      devSourcemap: true,
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
    plugins: [react(), tsconfigPaths(), createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/style/images')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),],
    // resolve: {
    //   base: '/',
    //   alias: {
    //     '@': path.resolve(__dirname, 'src'),
    //   },
    // },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: proxy_url,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
  return defineConfig(config);
};
