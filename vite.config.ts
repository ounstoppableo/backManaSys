import { ConfigEnv, UserConfigExport, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
//引入svg插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
//引入mock插件
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_APP_FOR_USER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/product": {
          target: env.VITE_APP_FOR_PRODUCT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/product/, ""),
        },
      },
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        // default
        mockPath: "mock",
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
  };
};
