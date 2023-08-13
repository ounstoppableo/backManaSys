<template>
  <el-card style="margin: 1.25rem" v-show="scence === 2">
    <el-form :model="skuFormData" :rules="skuFormRules" ref="formRef">
      <el-form-item label="sku名称" prop="skuName">
        <el-input
          placeholder="sku名称"
          v-model="skuFormData.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input placeholder="价格(元)" v-model="skuFormData.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)" prop="weight">
        <el-input
          placeholder="重量(克)"
          v-model="skuFormData.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="sku描述" prop="skuDesc">
        <el-input
          type="textarea"
          placeholder="sku描述"
          v-model="skuFormData.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form
          :inline="true"
          :model="hadSelectBaseAttr"
          label-width="80"
          label-position="left"
        >
          <el-form-item
            v-for="(item, index) in baseAttr"
            :key="item.id"
            :label="item.attrName"
            style="margin-bottom: 0.625rem"
          >
            <el-select v-model="hadSelectBaseAttr[index]">
              <el-option
                v-for="itemValue in item.attrValueList"
                :key="itemValue.id"
                :value="itemValue.valueName"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form
          :inline="true"
          label-width="80"
          label-position="left"
          :model="hadSelectSpuAttr"
        >
          <el-form-item
            v-for="(item, index) in spuInfo.spuSaleAttrList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select v-model="hadSelectSpuAttr[index]">
              <el-option
                v-for="spuAttrValue in item.spuSaleAttrValueList"
                :key="spuAttrValue.id"
                :value="spuAttrValue.saleAttrValueName"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table
          border
          style="margin-bottom: 1.25rem"
          :data="spuInfo.spuImageList"
          @select="select"
          @select-all="selectAll"
          ref="tableRef"
        >
          <el-table-column type="selection" align="center" width="80" />
          <el-table-column label="图片">
            <template #="{ row }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 6.25rem; height: 6.25rem; object-fit: contain"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                :type="row.isDefault ? 'success' : 'warning'"
                @click="setDefault(row)"
                >设为默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import selector from "@/store/modules/selector";
import {
  infoDetial,
  spuSaleAttrListItem,
  spuSaleAttrValueListItem,
} from "@/api/product/spu/type";
import { getBaseInfo as getSpuInfo } from "@/api/product/spu/index";
import { getProperty } from "@/api/product/property/index";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import type { SkuForm } from "@/api/product/sku/type";
import type { FormRules } from "element-plus";
import { addSku } from "@/api/product/sku/index";
defineProps(["scence"]);
const selectorData = selector();
//用于切换场景
const $emit = defineEmits(["cancel"]);
//基本属性
const baseAttr = ref<any>([]);
//用于存储spu信息
const spuInfo = ref<infoDetial>({
  category3Id: "",
  description: "",
  id: "",
  spuImageList: [],
  spuName: "",
  spuSaleAttrList: [],
  tmId: "",
});
//表单实例
const formRef = ref();
//sku添加请求携带的数据
const skuFormData = ref<SkuForm>({
  category3Id: "",
  price: "",
  skuAttrValueList: [],
  skuDesc: "",
  skuImageList: [],
  skuName: "",
  skuSaleAttrValueList: [],
  spuId: "",
  weight: "",
});
//用于存储选好的基本属性
const hadSelectBaseAttr = ref<string[]>([]);
//用于存储选好的spu属性
const hadSelectSpuAttr = ref<string[]>([]);
//获取选择图片的table的vc
const tableRef = ref();
function cancel() {
  $emit("cancel");
}
//表单验证
const skuFormRules = reactive<FormRules<SkuForm>>({
  skuName: [
    {
      required: true,
      min: 2,
      message: "sku名称长度必须大于两个字符",
      trigger: "blur",
    },
  ],
  price: [{ required: true, message: "请填写价格", trigger: "blur" }],
  weight: [{ required: true, message: "请填写重量", trigger: "blur" }],
  skuDesc: [
    {
      required: true,
      min: 2,
      message: "sku描述长度必须大于两个字符",
      trigger: "blur",
    },
  ],
});

//初始化页面数据
async function getBaseInfo(spuId: number, cate3Id: number) {
  const getBaseAttrRes = await getProperty(
    selectorData.cate1Id,
    selectorData.cate2Id,
    cate3Id,
  );
  if (getBaseAttrRes.code !== 200)
    return ElMessage.error({ message: "平台属性获取失败，请刷新重试!" });
  baseAttr.value = getBaseAttrRes.data;
  const getSpuInfoRes = await getSpuInfo(spuId);
  if (getSpuInfoRes.code !== 200)
    return ElMessage.error({ message: "spu信息获取失败，请刷新重试!" });
  spuInfo.value = getSpuInfoRes.data as infoDetial;
  skuFormData.value.category3Id = cate3Id;
  skuFormData.value.spuId = spuId;
}
//切换场景时清空数据
function clearData() {
  spuInfo.value = {
    category3Id: "",
    description: "",
    id: "",
    spuImageList: [],
    spuName: "",
    spuSaleAttrList: [],
    tmId: "",
  };
  skuFormData.value = {
    category3Id: "",
    price: "",
    skuAttrValueList: [],
    skuDesc: "",
    skuImageList: [],
    skuName: "",
    skuSaleAttrValueList: [],
    spuId: "",
    weight: "",
  };
  hadSelectBaseAttr.value = [];
  hadSelectSpuAttr.value = [];
  baseAttr.value = [];
  formRef.value.resetFields();
}
//设为默认的回调
function setDefault(row: any) {
  tableRef.value.clearSelection();
  if (spuInfo.value.spuImageList) {
    (spuInfo.value.spuImageList as any[]).forEach((item: any) => {
      if (row !== item) {
        item.isDefault = false;
      }
    });
  }
  row.isDefault = !row.isDefault;
  tableRef.value.toggleRowSelection(row, row.isDefault ? true : false);
  row.isDefault
    ? ElMessage.success({ message: "设置默认成功" })
    : ElMessage.success({ message: "取消默认成功" });
}
//选择图片时
function select(_: any, row: any) {
  tableRef.value.clearSelection();
  if (spuInfo.value.spuImageList) {
    (spuInfo.value.spuImageList as any[]).forEach((item: any) => {
      if (row !== item) {
        item.isDefault = false;
      }
    });
  }
  row.isDefault = !row.isDefault;
  tableRef.value.toggleRowSelection(row, row.isDefault ? true : false);
  row.isDefault
    ? ElMessage.success({ message: "设置默认成功" })
    : ElMessage.success({ message: "取消默认成功" });
}
//多选回调
function selectAll() {
  tableRef.value.clearSelection();
  if (spuInfo.value.spuImageList) {
    (spuInfo.value.spuImageList as any[]).forEach(
      (item: any) => (item.isDefault = false),
    );
  }
}
//确认添加
async function confirm() {
  await formRef.value.validate();
  //将基本属性填好
  skuFormData.value.skuAttrValueList = [];
  hadSelectBaseAttr.value.forEach((item: any, index: number) => {
    if (item) {
      const attr = baseAttr.value[index].attrValueList.filter(
        (value: any) => item === value.valueName,
      );
      skuFormData.value.skuAttrValueList.push({
        attrId: baseAttr.value[index].id,
        attrName: baseAttr.value[index].attrName,
        skuId: spuInfo.value.id as number,
        valueId: attr[0].id,
        valueName: item,
      });
    }
  });
  if (!skuFormData.value.skuAttrValueList.length) {
    ElMessage.error({ message: "请选择至少一个平台属性!" });
    throw new Error("请选择至少一个平台属性!");
  }
  //将sku属性填好
  skuFormData.value.skuSaleAttrValueList = [];
  hadSelectSpuAttr.value.forEach((item: any, index: number) => {
    if (item) {
      const skuItem = (spuInfo.value.spuSaleAttrList as spuSaleAttrListItem[])[
        index
      ].spuSaleAttrValueList?.filter(
        (skuAttrItem: any) => skuAttrItem.saleAttrValueName === item,
      );
      skuFormData.value.skuSaleAttrValueList.push({
        saleAttrId: (spuInfo.value.spuSaleAttrList as spuSaleAttrListItem[])[
          index
        ].id as number,
        saleAttrName: (spuInfo.value.spuSaleAttrList as spuSaleAttrListItem[])[
          index
        ].saleAttrName,
        saleAttrValueId: (skuItem as spuSaleAttrValueListItem[])[0]
          .id as number,
        saleAttrValueName: (skuItem as spuSaleAttrValueListItem[])[0]
          .saleAttrValueName as string,
        spuId: spuInfo.value.id as number,
      });
    }
  });
  if (!skuFormData.value.skuSaleAttrValueList.length) {
    ElMessage.error({ message: "请选择至少一个销售属性!" });
    throw new Error("请选择至少一个销售属性!");
  }
  spuInfo.value.spuImageList?.forEach((item) => {
    skuFormData.value.skuImageList.push({
      imgName: item.imgName,
      imgUrl: item.imgUrl,
      isDefault: item.isDefault as boolean,
    });
    if (item.isDefault === true) skuFormData.value.skuDefaultImg = item.imgUrl;
  });
  const res = await addSku(skuFormData.value);
  if (res.code === 200) {
    ElMessage.success({ message: "添加Sku成功" });
    cancel();
  } else {
    ElMessage.error({ message: res.data as string });
  }
}
defineExpose({
  getBaseInfo,
  clearData,
});
</script>
<script lang="ts">
export default { name: "SkuForm" };
</script>
<style scoped lang="scss"></style>
