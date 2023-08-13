<template>
  <el-card style="margin: 1.25rem">
    <el-table :data="tableData" row-key="id" border>
      <el-table-column label="名称" prop="name" />
      <el-table-column label="权限值" prop="code" />
      <el-table-column label="修改时间" prop="updateTime" />
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button
            type="primary"
            @click="toAddMenu(row)"
            v-hasBtnAuth="'btn.Permission.add'"
            >添加菜单</el-button
          >
          <el-button
            type="warning"
            @click="edit(row)"
            v-hasBtnAuth="'btn.Permission.update'"
            >修改</el-button
          >
          <el-button
            type="danger"
            @click="del(row)"
            v-hasBtnAuth="'btn.Permission.remove'"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form :model="formData" :rules="rules" ref="formRef">
        <el-form-item label="名称" label-width="80" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值" label-width="80">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { getMenu, updateMenu, delMenu } from "@/api/acl/menu/index";
import type { menuResDataItem, AddMenuFormType } from "@/api/acl/menu/type";
import { ref, reactive, nextTick } from "vue";
import { ElMessage, type FormRules } from "element-plus";
const tableData = ref<menuResDataItem[]>([]);
//用于控制dialog的显示
const dialogVisible = ref(false);
//表单数据
const formData = ref<AddMenuFormType>({
  name: "",
  code: "",
  level: 0,
  pid: "",
});
//表单约束
const rules = reactive<FormRules<any>>({
  name: [
    { required: true, min: 2, message: "字符必须不少于两位", trigger: "blur" },
  ],
});
//获取表单实例
const formRef = ref();
async function toGetMenu() {
  const res = await getMenu();
  tableData.value = res.data;
}
toGetMenu();
function toAddMenu(row: any) {
  dialogVisible.value = true;
  nextTick(() => {
    formRef.value.resetFields();
    formData.value = {
      name: "",
      code: "",
      level: row.level + 1,
      pid: row.id,
    };
  });
}
async function confirm() {
  await formRef.value.validate();
  const res = await updateMenu(formData.value);
  if (res.code === 200) {
    ElMessage.success({
      message: formData.value.id ? "更新成功!" : "添加成功!",
    });
    toGetMenu();
    dialogVisible.value = false;
  } else {
    ElMessage.error({ message: "添加失败!" });
  }
}
async function edit(row: any) {
  dialogVisible.value = true;
  nextTick(() => {
    formRef.value.resetFields();
    formData.value = row;
  });
}
async function del(row: any) {
  const res = await delMenu(row.id);
  if (res.code === 200) {
    ElMessage.success({ message: "删除成功!" });
    toGetMenu();
  } else {
    ElMessage.error({ message: "删除失败!" });
  }
}
</script>
<script lang="ts">
export default { name: "menumana" };
</script>
<style scoped lang="scss"></style>
