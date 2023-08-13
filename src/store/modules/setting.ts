import { defineStore } from "pinia";
export default defineStore("layoutSetting", {
  state() {
    return {
      //菜单栏隐藏标志
      hidenMenuFlag: false,
      //辅助刷新Main内容标志
      mainFresh: true,
    };
  },
});
