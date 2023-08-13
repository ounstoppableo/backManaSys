import { defineStore } from "pinia";
import { getCate1, getCate2, getCate3 } from "@/api/product/property/index";
import type { dataType } from "@/api/product/property/type";
export default defineStore("selector", {
  state() {
    return {
      cate1Id: "",
      cate1Arr: [] as Array<dataType>,
      cate2Id: "",
      cate2Arr: [] as Array<dataType>,
      cate3Id: "",
      cate3Arr: [] as Array<dataType>,
    };
  },
  actions: {
    //获取1级分类
    async getAllcate1(): Promise<string> {
      const res = await getCate1();
      if (res.code === 200) {
        this.cate1Arr = res.data;
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },
    //获取2级分类
    async getAllcate2(): Promise<string> {
      const res = await getCate2(this.cate1Id);
      if (res.code === 200) {
        this.cate2Arr = res.data;
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },
    //获取3级分类
    async getAllcate3(): Promise<string> {
      const res = await getCate3(this.cate2Id);
      if (res.code === 200) {
        this.cate3Arr = res.data;
        return "ok";
      } else {
        return Promise.reject(res.message);
      }
    },
    clearStore() {
      this.cate1Id = "";
      this.cate1Arr = [];
      this.cate2Id = "";
      this.cate2Arr = [];
      this.cate3Id = "";
      this.cate3Arr = [];
    },
  },
});
