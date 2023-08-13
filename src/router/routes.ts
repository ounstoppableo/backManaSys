//@ts-ignore
import lodash from "lodash";
//常量路由
export const constRoutes = [
  //根路径，重定向到home
  {
    path: "/",
    redirect: "/home",
    meta: {
      isShow: false,
    },
  },
  //home页面
  {
    path: "/home",
    name: "home",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页",
      isShow: true,
      icon: "HomeFilled",
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/view/home/index.vue"),
        meta: {
          isShow: false,
        },
      },
    ],
  },
  //登录页面
  {
    path: "/login",
    component: () => import("@/view/login/index.vue"),
    name: "login",
    meta: {
      isShow: false,
    },
  },
  //数据大屏
  {
    path: "/dataShow",
    component: () => import("@/view/dataShow/index.vue"),
    name: "DataShow",
    meta: {
      title: "数据大屏",
      isShow: true,
      icon: "Monitor",
    },
  },
  //404页面
  {
    path: "/404",
    component: () => import("@/view/404/index.vue"),
    name: "404",
    meta: {
      isShow: false,
    },
  },
];
//异步路由
export const asyncRoutes = [
  //权限管理
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    redirect: "/acl/usermana",
    meta: {
      title: "权限管理",
      isShow: true,
      icon: "Lock",
    },
    children: [
      {
        path: "/acl/usermana",
        component: () => import("@/view/acl/usermana/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          isShow: true,
          icon: "User",
        },
      },
      {
        path: "/acl/rolemana",
        component: () => import("@/view/acl/rolemana/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          isShow: true,
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/menumana",
        component: () => import("@/view/acl/menumana/index.vue"),
        name: "Order",
        meta: {
          title: "菜单管理",
          isShow: true,
          icon: "Menu",
        },
      },
    ],
  },
  //商品管理
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    redirect: "/product/brand",
    meta: {
      title: "商品管理",
      isShow: true,
      icon: "ShoppingCart",
    },
    children: [
      {
        path: "/product/brand",
        component: () => import("@/view/product/brand/index.vue"),
        name: "Trademark",
        meta: {
          title: "品牌管理",
          isShow: true,
          icon: "Apple",
        },
      },
      {
        path: "/product/property",
        component: () => import("@/view/product/property/index.vue"),
        name: "Attr",
        meta: {
          title: "属性管理",
          isShow: true,
          icon: "Magnet",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/view/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "sku管理",
          isShow: true,
          icon: "Coin",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/view/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "spu管理",
          isShow: true,
          icon: "Key",
        },
      },
    ],
  },
];
//任意路由，其他页面，重定向到404页面
export const anyRoutes = {
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "Any",
  meta: {
    isShow: false,
  },
};

//异步路由过滤函数
export function filterRoutes(permission: Array<string>, routes: Array<any>) {
  function recursion(permission: Array<string>, routes: Array<any>) {
    const selectedRoute: Array<any> = [];
    permission.forEach((item) => {
      routes.forEach((route: any) => {
        if (route.name === item) {
          const temp = lodash.cloneDeep(route);
          temp.children = null;
          selectedRoute.push(temp);
          if (route.children?.length) {
            temp.children = recursion(permission, route.children);
          }
        }
      });
    });
    return selectedRoute;
  }
  return recursion(permission, routes);
}
