<template>
  <div>
    <el-card style="margin: 1.25rem">
      <el-row>
        <el-col style="display: flex; align-items: center" :span="6">
          <div style="width: 5rem">用户名:</div>
          <el-input v-model="keywords" placeholder="请输入用户名"></el-input>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="6" style="display: flex; justify-content: right">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin: 1.25rem">
      <el-button type="primary" @click="addUser" v-hasBtnAuth="'btn.User.add'"
        >添加</el-button
      >
      <el-button
        type="danger"
        @click="toDelBatch"
        v-hasBtnAuth="'btn.User.remove'"
        >批量删除</el-button
      >
      <el-table
        border
        style="margin: 0.625rem 0"
        :data="tableData"
        ref="tableRef"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户名称"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="280" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="distriUser(row)"
              v-hasBtnAuth="'btn.User.assgin'"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="editUser(row)"
              v-hasBtnAuth="'btn.User.update'"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="toDelUser(row)"
              v-hasBtnAuth="'btn.User.remove'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[5, 10, 15, 20]"
        :disabled="disabled"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ formData.id ? "编辑用户" : "添加用户" }}</h4>
        </template>
        <template #default>
          <el-form :model="formData" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="name">
              <el-input
                placeholder="请输入用户姓名"
                v-model="formData.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input
                placeholder="请输入用户昵称"
                v-model="formData.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input
                placeholder="请输入用户密码"
                type="password"
                v-model="formData.password"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="confirmClick">确认</el-button>
          </div>
        </template>
      </el-drawer>
      <el-drawer v-model="drawer2">
        <template #header>
          <h4>{{ "分配角色" }}</h4>
        </template>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input :value="formForRole.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="formForRole.roleIdList"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox
                v-for="role in roles"
                :key="role.id"
                :label="role.id"
                >{{ role.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick2">取消</el-button>
            <el-button type="primary" @click="confirmClick2">确认</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {
  getUser,
  updateUser,
  delUser,
  delBatch,
  distriRoles,
  getUserRoles,
} from "@/api/acl/usermana/index";
import { nextTick, reactive, ref } from "vue";
import type { recordsItem, UpdateUser } from "@/api/acl/usermana/type";
import { ElMessage, FormRules } from "element-plus";
import type { roleForm } from "@/api/acl/rolemana/type";
const page = ref(1);
const limit = ref(5);
const disabled = ref(true);
const total = ref(0);
//控制添加/编辑用户抽屉的开关
const drawer = ref(false);
//控制分配角色的开关
const drawer2 = ref(false);
//用于存储表格数据
const tableData = ref<recordsItem[]>([]);
//用于获取表格实例
const tableRef = ref();
//用于获取表单vc
const formRef = ref();
//多选控制
const checkAll = ref(false);
//多选框的不确定状态
const isIndeterminate = ref(false);
//角色列表
type roleItem = {
  id: number;
  roleName: string;
};
const roles = ref<roleItem[]>([]);
//用于存放分配角色的数据
const formForRole = ref<roleForm>({
  roleIdList: [],
  userId: "",
  username: "",
});
//用于记录添加/编辑用户的表单
const formData = ref<UpdateUser>({
  id: "",
  name: "",
  password: "",
  username: "",
});
//定义表单校验规则
const rules = reactive<FormRules<UpdateUser>>({
  name: [
    { required: true, min: 5, message: "请输入5位以上字符", trigger: "blur" },
  ],
  username: [
    { required: true, min: 5, message: "请输入5位以上字符", trigger: "blur" },
  ],
  password: [
    { required: true, min: 6, message: "请输入6以上字符", trigger: "blur" },
  ],
});
//关键字
const keywords = ref<string>("");
//实际用于搜索的数据
const forSearch = ref<string>("");
//用于发送请求
async function getUserData(page: number, limit: number) {
  const res = await getUser(page, limit, forSearch.value);
  if (res.code === 200) {
    disabled.value = false;
    tableData.value = (res.data as any).records;
    total.value = (res.data as any).total;
  } else {
    disabled.value = true;
    ElMessage.error({
      message: "获取数据失败，请刷新重试!",
    });
  }
}
getUserData(page.value, limit.value);
//更改分页大小的回调
function handleSizeChange(value: number) {
  limit.value = value;
  page.value = 1;
  getUserData(page.value, limit.value);
}
//更改页数的回调
function handleCurrentChange(value: number) {
  page.value = value;
  getUserData(page.value, limit.value);
}
//添加用户的回调
function addUser() {
  drawer.value = true;
  nextTick(() => {
    formRef.value.resetFields();
    Object.assign(formData.value, {
      id: "",
      name: "",
      password: "",
      username: "",
      createTime: "",
      phone: "",
      updateTime: "",
      roleName: "",
    });
  });
}
//编辑用户的回调
function editUser(row: any) {
  drawer.value = true;
  Object.assign(formData.value, row);
}
//抽屉取消按钮的回调
function cancelClick() {
  drawer.value = false;
}
//抽屉确认按钮的回调
async function confirmClick() {
  await formRef.value.validate();
  const res = await updateUser(formData.value);
  if (res.code === 200) {
    drawer.value = false;
    ElMessage.success({
      message: formData.value.id ? "编辑成功" : "添加成功",
    });
    page.value = formData.value.id ? page.value : 1;
    getUserData(page.value, limit.value);
  } else {
    ElMessage.error({
      message: "操作失败",
    });
  }
}
//删除用户的回调
async function toDelUser(row: any) {
  const res = await delUser(row.id);
  if (res.code === 200) {
    ElMessage.success({ message: "删除成功!" });
    tableData.value.length > 1 && page.value > 1 ? page.value : page.value--;
    getUserData(page.value, limit.value);
  } else {
    ElMessage.error({ message: res.data as string });
  }
}
//批量删除的回调
async function toDelBatch() {
  const selected = tableRef.value.getSelectionRows();
  const arr: number[] = [];
  selected.forEach((item: any) => {
    arr.push(item.id);
  });
  const res = await delBatch(arr);
  if (res.code === 200) {
    ElMessage.success({
      message: "删除成功!",
    });
    page.value =
      tableData.value.length > arr.length && page.value > 1
        ? page.value
        : page.value--;
    getUserData(page.value, limit.value);
  } else {
    ElMessage.error({
      message: "删除失败!",
    });
  }
}
//分配角色按钮的回调
async function distriUser(row: any) {
  drawer2.value = true;
  formForRole.value.userId = row.id;
  formForRole.value.username = row.username;
  const res = await getUserRoles(row.id);
  if (res.code === 200) {
    roles.value = res.data.allRolesList.map((item: any) => {
      return {
        id: item.id,
        roleName: item.roleName,
      };
    });
    formForRole.value.roleIdList = res.data.assignRoles.map(
      (item: any) => item.id,
    );
  } else {
    ElMessage.error({ message: "获取角色列表失败，请刷新重试!" });
  }
}
//分配角色抽屉的取消按钮的回调
function cancelClick2() {
  drawer2.value = false;
}
//全选按钮的回调
function handleCheckAllChange(val: boolean) {
  formForRole.value.roleIdList = val ? roles.value.map((item) => item.id) : [];
  isIndeterminate.value = false;
}
//单选按钮的回调
function handleCheckedRolesChange(value: string[]) {
  const checkedCount = value.length;
  checkAll.value = checkedCount === roles.value.length;
  isIndeterminate.value = checkedCount > 0 && !checkAll.value;
}
//分配角色的确认按钮
async function confirmClick2() {
  const res = await distriRoles(formForRole.value);
  if (res.code === 200) {
    ElMessage.success({
      message: "分配角色成功!",
    });
    drawer2.value = false;
    getUserData(page.value, limit.value);
  } else {
    ElMessage.error({
      message: res.data as string,
    });
  }
}
//搜索按钮的回调
async function search() {
  page.value = 1;
  forSearch.value = keywords.value;
  keywords.value = "";
  await getUserData(page.value, limit.value);
}
//重置按钮的回调
async function reset() {
  forSearch.value = "";
  page.value = 1;
  limit.value = 5;
  await getUserData(page.value, limit.value);
}
</script>
<script lang="ts">
export default { name: "usermana" };
</script>
<style scoped lang="scss"></style>
