<template>
  <div>
    <Selector :scence="scence"></Selector>
    <el-card style="margin: 1.25rem" v-show="scence === 0">
      <el-button
        type="primary"
        icon="Plus"
        :disabled="disabled"
        @click="addSpu"
        v-hasBtnAuth="'btn.Spu.add'"
        >添加SPU</el-button
      >
      <el-table :data="tabelData" border style="margin: 0.625rem 0">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        />
        <el-table-column prop="spuName" label="SPU名称" />
        <el-table-column prop="description" label="SPU描述" />
        <el-table-column label="SPU操作">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="Plus"
              circle
              @click="addSku(row)"
              v-hasBtnAuth="'btn.Spu.addsku'"
            ></el-button>
            <el-button
              type="warning"
              icon="Edit"
              @click="toEdit(row)"
              circle
              v-hasBtnAuth="'btn.Spu.update'"
            ></el-button>
            <el-button
              type="info"
              icon="InfoFilled"
              circle
              @click="showSku(row)"
              v-hasBtnAuth="'btn.Spu.skus'"
            ></el-button>
            <el-button
              type="danger"
              icon="Delete"
              circle
              @click="toDelSpu(row)"
              v-hasBtnAuth="'btn.Spu.delete'"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination
          background
          v-model:current-page="page"
          v-model:page-size="limit"
          :page-sizes="[3, 6, 9, 12]"
          layout="prev, pager, next, jumper,->, sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-card style="margin: 1.25rem" v-show="scence === 1">
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item prop="spuName" label="spu名称">
          <el-input v-model="formData.spuName"></el-input>
        </el-form-item>
        <el-form-item label="spu品牌">
          <el-select v-model="formData.spuName">
            <!-- <el-option v-for=""></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item prop="description" label="spu描述">
          <el-input type="textarea" v-model="formData.description" />
        </el-form-item>
        <el-form-item label="spu照片">
          <el-upload
            v-model:file-list="fileList"
            action="/product/admin/product/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item prop="spuSaleAttrList" label="spu销售属性">
          <el-select
            v-model="relayAttr"
            class="m-2"
            placeholder="请选择属性"
            style="margin-right: 0.625rem"
          >
            <el-option
              v-for="(item,, index) in baseAttr"
              :key="index"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-button type="primary" icon="Plus" @click="addAttr"
            >添加销售属性</el-button
          >
          <el-table
            border
            style="margin: 0.625rem 0"
            :data="formData.spuSaleAttrList"
          >
            <el-table-column
              label="序号"
              type="index"
              width="80"
              align="center"
            ></el-table-column>
            <el-table-column prop="saleAttrName" label="属性名" width="100" />
            <el-table-column label="属性值">
              <template #="{ row, $index }">
                <div style="display: flex; align-items: center">
                  <el-tag
                    v-for="(tag, index) in row.spuSaleAttrValueList"
                    :key="tag.id"
                    class="mx-1"
                    @close="delTag(row.spuSaleAttrValueList, index, $index)"
                    closable
                    style="margin: 0.3125rem"
                  >
                    {{ tag.saleAttrValueName }}
                  </el-tag>
                  <el-input
                    v-model="inputAttrName"
                    v-show="row.flag"
                    placeholder="请输入属性值"
                    style="width: 9.375rem; margin: 0 0.3125rem"
                    maxlength="10"
                    @blur="inputBlur(row)"
                    :ref="(vc: any) => (inputArr[$index] = vc)"
                    size="small"
                  />
                  <el-button
                    type="success"
                    icon="Plus"
                    size="small"
                    style="margin-left: 0.3125rem"
                    @click="addTag(row, $index)"
                  ></el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #="{ row, $index }">
                <el-popconfirm
                  :title="`您确定要删除${row.saleAttrName}属性吗?`"
                  width="250px"
                  @confirm="delAttr($index)"
                >
                  <template #reference>
                    <el-button type="danger" icon="Delete" circle></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click="toCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <SkuForm ref="sku" :scence="scence" @cancel="SkuFormCancel"></SkuForm>
    <el-dialog v-model="skuDialogVisible" title="SKU列表">
      <el-table :data="skuList">
        <el-table-column label="SKU名称" prop="skuName" />
        <el-table-column label="SKU价格(元)" prop="price" />
        <el-table-column label="SKU重量(克)" prop="weight" />
        <el-table-column label="SKU图片">
          <template #="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 6.25rem; height: 6.25rem; object-fit: contain"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from "vue";
import selector from "@/store/modules/selector";
import {
  getIndex,
  getBaseInfo,
  getBaseAttr,
  updateSpu,
  delSpu,
} from "@/api/product/spu/index";
import { ElMessage } from "element-plus";
import type {
  infoDetial,
  baseAttr,
  spuSaleAttrListItem,
} from "@/api/product/spu/type";
import type { UploadProps, UploadUserFile, FormRules } from "element-plus";
import SkuForm from "./skuform.vue";
import { showSkuBySpuId } from "@/api/product/sku/index";
import type { SkuForm as SkuData } from "@/api/product/sku/type";
//用于场景切换
const scence = ref(0);
//禁用添加spu按钮
const disabled = ref(true);
const selectorData = selector();
const tabelData = ref([]);
//请求的页数
const page = ref(1);
//请求单页的数据限制
const limit = ref(3);
//总页数
const total = ref(0);
//用于记录表单内容
const formData = ref<infoDetial>({
  category3Id: "",
  description: "",
  id: "",
  spuImageList: [],
  spuName: "",
  spuSaleAttrList: [],
  tmId: "",
});
//获取表单ref
const formRef = ref();
//用于存储spu基本属性
const baseAttr = ref<baseAttr[]>([]);
//用于中继存储属性值
const relayAttr = ref("");
//用于存储添加的属性值的名称的
const inputAttrName = ref("");
//用于存放属性值input框的vc,用于聚焦
const inputArr: any[] = [];
//获取数据
async function toGetIndex(
  page: number,
  limit: number,
  category3Id: string | number,
) {
  const res = await getIndex(page, limit, category3Id);
  if (res.code === 200) {
    tabelData.value = res.data.records;
    total.value = res.data.total;
  } else {
    ElMessage.error({
      message: "获取数据失败，请刷新重试!",
    });
  }
}
//用于存放图片列表
const fileList = ref<UploadUserFile[]>([]);
//用于存放缩略图
const dialogImageUrl = ref("");
//用于展示缩略图dialog
const dialogVisible = ref(false);
//用于获取skufrom的vc
const sku = ref();
//用于控制skudialog的显示
const skuDialogVisible = ref(false);
//用于存放sku列表
const skuList = ref<SkuData[]>([]);
watch(
  () => selectorData.cate3Id,
  () => {
    tabelData.value = [];
    page.value = 1;
    disabled.value = true;
    if (selectorData.cate3Id) {
      disabled.value = false;
      toGetIndex(page.value, limit.value, selectorData.cate3Id);
    }
  },
);
//监听scence的变化，每次变化都清空formData
watch(scence, () => {
  formRef.value?.resetFields();
  formData.value = {
    category3Id: selectorData.cate3Id,
    description: "",
    id: "",
    spuImageList: [],
    spuName: "",
    spuSaleAttrList: [],
    tmId: "",
  };
  fileList.value = [];
  sku.value.clearData();
});
//定义表单校验规则
const rules = reactive<FormRules<infoDetial>>({
  spuName: [
    {
      required: true,
      min: 2,
      max: 30,
      message: "长度必须在2~10个字符",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      min: 2,
      message: "长度必须大于两个字符",
      trigger: "change",
    },
  ],
  spuSaleAttrList: [
    { required: true, validator: validateSpuSaleAttrList, trigger: "change" },
  ],
});
function validateSpuSaleAttrList(_: any, value: any, callback: any) {
  if (value.length) {
    value.forEach((item: spuSaleAttrListItem) => {
      if (!item.spuSaleAttrValueList?.length) {
        callback(new Error("每个属性必须有至少一个属性值!"));
      }
    });
    callback();
  } else {
    callback(new Error("必须有至少一个属性!"));
  }
}
//页面容量改变时的回调
function handleSizeChange(value: number) {
  limit.value = value;
  page.value = 1;
  toGetIndex(page.value, limit.value, selectorData.cate3Id);
}
//当前页面发生变化后的回调
function handleCurrentChange(value: number) {
  page.value = value;
  toGetIndex(page.value, limit.value, selectorData.cate3Id);
}
//点击编辑按钮后的回调
async function toEdit(row: any) {
  scence.value = 1;
  const resForBaseInfo = await getBaseInfo(row.id);
  const resForBaseAttr = await getBaseAttr();
  baseAttr.value = resForBaseAttr.data;
  if (resForBaseInfo.code === 200) {
    formData.value = resForBaseInfo.data as infoDetial;
    formData.value.spuImageList?.forEach((item) => {
      fileList.value.push({
        name: item.imgName,
        url: item.imgUrl,
      });
    });
  } else {
    ElMessage.error({
      message: "获取数据失败，请重新操作!",
    });
  }
}
//查看缩略图的回调
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
//上传图片前的约束
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile: any) => {
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpeg" ||
    rawFile.type === "image/jpg" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 <= 4) {
      ElMessage.success({
        message: "文件上传成功!",
      });
      return true;
    } else {
      ElMessage.error({
        message: "文件大小必须小于4MB!",
      });
      return false;
    }
  } else {
    ElMessage.error({
      message: "上传的文件类型必须为图片!",
    });
    return false;
  }
};
//取消提交的回调
function toCancel() {
  scence.value = 0;
}
//删除属性值的回调
function delTag(list: any, index: number, attrIndex: number) {
  list.splice(index, 1);
  if (list.length === 0) {
    formData.value.spuSaleAttrList?.splice(attrIndex, 1);
  }
}
//删除属性的回调
function delAttr(index: number) {
  formData.value.spuSaleAttrList?.splice(index, 1);
}
//添加销售属性
function addAttr() {
  let repeat = formData.value.spuSaleAttrList?.find(
    (item) => item.saleAttrName === relayAttr.value,
  );
  if (repeat) {
    return ElMessage.error({
      message: "属性不能重复!",
    });
  }
  (formData.value.spuSaleAttrList as spuSaleAttrListItem[]).push({
    baseSaleAttrId: (
      baseAttr.value.find((item) => item.name === relayAttr.value) as baseAttr
    ).id,
    saleAttrName: relayAttr.value,
    spuSaleAttrValueList: [],
  });
  relayAttr.value = "";
}
//添加属性值的回调
function addTag(row: any, index: number) {
  row.flag = true;
  inputArr[index].focus();
}
//input表单失去焦点的回调
function inputBlur(row: any) {
  if (inputAttrName.value.trim()) {
    let repeat = row.spuSaleAttrValueList.find(
      (item: any) => item.saleAttrValueName === inputAttrName.value,
    );
    if (!repeat) {
      row.spuSaleAttrValueList.push({
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrName: row.saleAttrName,
        spuId: row.spuId,
        saleAttrValueName: inputAttrName.value,
      });
    } else {
      inputAttrName.value = "";
      ElMessage.error({
        message: "属性值不能重复!",
      });
      return;
    }
  }
  inputAttrName.value = "";
  row.flag = false;
}
//提交表单事件
async function submit() {
  await formRef.value.validate();
  //添加图片
  if (fileList.value.length) {
    fileList.value.forEach((item) => {
      if (formData.value.spuImageList) {
        formData.value.spuImageList.push({
          imgName: item.name,
          imgUrl: (item.response as any).data,
        });
      } else {
        formData.value.spuImageList = [];
        formData.value.spuImageList.push({
          imgName: item.name,
          imgUrl: (item.response as any).data,
        });
      }
    });
  }
  const res = await updateSpu(formData.value);
  if (res.code === 200) {
    ElMessage.success({
      message: "添加成功",
    });
    scence.value = 0;
    toGetIndex(page.value, limit.value, selectorData.cate3Id);
  } else {
    console.log(res);
    ElMessage.error({
      message: res.data as string,
    });
  }
}
//添加SPU的回调
async function addSpu() {
  scence.value = 1;
  const resForBaseAttr = await getBaseAttr();
  baseAttr.value = resForBaseAttr.data;
}
//删除SPU的回调
async function toDelSpu(row: any) {
  const res = await delSpu(row.id);
  if (res.code === 200) {
    ElMessage.success({
      message: "删除成功!",
    });
    if (tabelData.value.length === 1 && page.value > 1) {
      page.value -= 1;
    }
    toGetIndex(page.value, limit.value, selectorData.cate3Id);
  } else {
    ElMessage.error({
      message: res.data as string,
    });
  }
}
//添加sku的回调
function addSku(row: any) {
  scence.value = 2;
  sku.value.getBaseInfo(row.id, row.category3Id);
}
//sku表单取消按钮的回调
function SkuFormCancel() {
  scence.value = 0;
}
//sku列表展示回调
async function showSku(row: any) {
  skuList.value = [];
  const res = await showSkuBySpuId(row.id);
  if (res.code === 200) {
    skuDialogVisible.value = true;
    skuList.value = res.data as any;
  } else {
    ElMessage.error({ message: "获取sku失败，请刷新重试!" });
  }
}
</script>
<script lang="ts">
export default { name: "Spu" };
</script>
<style scoped lang="scss"></style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
