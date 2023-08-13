//封装设置本地存储token的函数
export const SET_TOKEN = (token: string): void => {
  localStorage.setItem("TOKEN", token);
};
