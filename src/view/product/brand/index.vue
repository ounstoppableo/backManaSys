<template>
  <el-card class="box-card">
    <el-button
      type="primary"
      :icon="Plus"
      @click="() => showDialog(null)"
      v-hasBtnAuth="'btn.Trademark.add'"
      >添加品牌</el-button
    >
    <el-table :data="brandData" border class="table">
      <el-table-column
        type="index"
        :index="1"
        label="序号"
        width="100px"
        align="center"
      />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template v-slot="{ row }">
          <LazyLoadImg
            :imgSrc="row.logoUrl"
            :key="row.id"
            width="100px"
            height="100px"
          ></LazyLoadImg>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            :icon="Edit"
            circle
            @click="() => showDialog(row)"
            v-hasBtnAuth="'btn.Trademark.update'"
          />
          <el-popconfirm
            :title="`您确定要删除${row.tmName}吗?`"
            width="250px"
            @confirm="confirmDeleteBrand(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                :icon="Delete"
                circle
                v-hasBtnAuth="'btn.Trademark.remove'"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="pageSize"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        :pager-count="pagerCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="addDataForm.id ? '编辑品牌' : '添加品牌'"
    >
      <el-form :model="addDataForm" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="addDataForm.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/product/admin/product/upload"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
          >
            <img
              v-if="addDataForm.logoUrl"
              :src="addDataForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <UploadFilled />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import {
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
} from "@/api/product/brand/index.ts";
import { ElNotification, ElMessage } from "element-plus";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import type { recordsItem, AddBrand } from "@/api/product/brand/type.ts";
import LazyLoadImg from "@/components/lazyLoadImg/index.vue";
import type { UploadProps, FormRules, FormInstance } from "element-plus";
//dialog开关
let dialogFormVisible = ref(false);
//当前页面
let currentPage = ref(1);
//是否为分页器添加背景颜色
let background = ref(true);
//设置最大页码数
let pagerCount = ref(5);
//是否禁用分页器
let disabled = ref(false);
//条目总数
let total = ref(0);
//请求的页数
let page = ref(1);
//每页条目的个数
let limit = ref(4);
//获取dialog表单
const formRef = ref<FormInstance>();
//更改每页条目个数
const pageSize = reactive([4, 8, 12, 16]);
//品牌数据
const brandData: Array<recordsItem> = reactive([]);
//添加品牌要上传的数据
const addDataForm = reactive<AddBrand>({
  id: "",
  tmName: "",
  logoUrl: "",
});
//打开dialog
function showDialog(row: any) {
  formRef.value?.resetFields();
  addDataForm.id = "";
  addDataForm.tmName = "";
  addDataForm.logoUrl = "";
  dialogFormVisible.value = true;
  if (row) {
    addDataForm.id = row.id;
    addDataForm.tmName = row.tmName;
    addDataForm.logoUrl = row.logoUrl;
  }
}
//获取数据
async function getBrandData(page: number, limit: number) {
  const res = await getBrand(page, limit);
  if (res.code === 200 && res.data != null) {
    if (brandData.length) {
      let num = brandData.length;
      for (let i = 0; i < num; i++) {
        brandData.pop();
      }
    }
    res.data.records.forEach((item: recordsItem) => {
      brandData.push(item);
    });
    total.value = res.data.total;
  } else {
    ElNotification.error({
      message: res.message,
    });
  }
}
//初始化数据
getBrandData(page.value, limit.value);
//修改每页选择个数时触发
function handleSizeChange(num: number) {
  currentPage.value = 1;
  page.value = 1;
  limit.value = num;
  getBrandData(page.value, limit.value);
}
//点击分页标签后触发
function handleCurrentChange(index: number) {
  page.value = index;
  getBrandData(page.value, limit.value);
}
//上传图片成功的回调
function handleLogoSuccess(res: any) {
  addDataForm.logoUrl = res.data;
}
//文件类型大小限制
const beforeLogoUpload: UploadProps["beforeUpload"] = (rawFile: any) => {
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
      addDataForm.logoUrl = "@/../loading.gif";
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
//表单校验规则
const rules = reactive<FormRules<typeof addDataForm>>({
  tmName: [{ required: true, validator: validatorTmName, trigger: "blur" }],
  logoUrl: [{ required: true, validator: validatorLogo }],
});
//品牌名字校验规则
function validatorTmName(_: any, value: any, callback: any) {
  if (value.trim().length >= 2 && value.trim().length <= 10) {
    callback();
  } else {
    callback(new Error("品牌名称必须在2~10个字符之间"));
  }
}
//logo校验
function validatorLogo(_: any, value: any, callback: any) {
  if (value) {
    callback();
  } else {
    callback(new Error("请上传图片!"));
  }
}
//dialog提交
async function confirm() {
  //发请求前进行校验
  await formRef.value?.validate();
  dialogFormVisible.value = false;
  let res = null;
  if (addDataForm.id) {
    res = await updateBrand(addDataForm);
  } else {
    res = await addBrand(addDataForm);
  }
  if (res.code === 200) {
    ElMessage.success({
      message: addDataForm.id ? "修改品牌成功" : "添加品牌成功",
    });
    getBrandData(page.value, limit.value);
  } else {
    ElMessage.error({
      message: res.data as string,
    });
  }
}
//删除品牌
async function confirmDeleteBrand(id: number) {
  const res = await deleteBrand(id);
  if (res.code === 200) {
    ElMessage.success({
      message: "删除品牌成功!",
    });
    getBrandData(
      brandData.length > 1 ? page.value : page.value - 1,
      limit.value,
    );
  } else {
    ElMessage.error({
      message: res.data as string,
    });
  }
}
</script>
<script lang="ts">
export default { name: "brand" };
</script>
<style scoped lang="scss">
.box-card {
  position: absolute;
  inset: 1.25rem;
  overflow: auto;
}

.table {
  margin: 0.625rem 0;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: contain;
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
