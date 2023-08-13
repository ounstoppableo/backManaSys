import { createRouter, createWebHashHistory } from "vue-router";
import { constRoutes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
});
export default router;
