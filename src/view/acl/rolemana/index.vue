<template>
  <div>
    <el-card style="margin: 1.25rem">
      <el-row>
        <el-col style="display: flex; align-items: center" :span="6">
          <div style="width: 6.25rem">角色名称</div>
          <el-input v-model="keywords" placeholder="请输入角色名称"></el-input>
        </el-col>
        <el-col :span="12"></el-col>
        <el-col :span="6" style="display: flex; justify-content: right">
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin: 1.25rem">
      <el-button type="primary" @click="addRole" v-hasBtnAuth="'btn.Role.add'"
        >添加角色</el-button
      >
      <el-table
        border
        style="margin: 0.625rem 0"
        :data="tableData"
        ref="tableRef"
      >
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="id" prop="id" align="center"></el-table-column>
        <el-table-column
          label="角色名称"
          prop="roleName"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="280">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="distriRole(row)"
              v-hasBtnAuth="'btn.Role.assgin'"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateRole(row)"
              v-hasBtnAuth="'btn.Role.update'"
              >编辑</el-button
            >
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="del(row)"
              v-hasBtnAuth="'btn.Role.remove'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 40]"
        :disabled="disabled"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      :title="updateRoleForm.id ? '更新' : '添加'"
      width="50%"
    >
      <el-form>
        <el-form-item label="角色名称">
          <el-input
            placeholder="请输入角色名称"
            v-model="updateRoleForm.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="tree"
          :data="treeData"
          :props="props"
          node-key="id"
          :default-expanded-keys="selectedKeys"
          show-checkbox
          @check-change="handleCheckChange"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  getRole,
  updateRole as updateRoleReq,
  delRole,
} from "@/api/acl/rolemana/index";
import { ElMessage } from "element-plus";
import type { recordItem, addRoleForm } from "@/api/acl/rolemana/type";
import { getMenuByRoleId, assignPermission } from "@/api/acl/menu/index";
import { menuResDataItem } from "@/api/acl/menu/type";
const page = ref(1);
const limit = ref(10);
const disabled = ref(true);
const total = ref(0);
//控制添加/更新角色的dialog显示
const dialogVisible = ref(false);
//用于存储数据
const tableData = ref<recordItem[]>([]);
//添加角色/更新角色的表单
const updateRoleForm = ref<addRoleForm>({
  id: "",
  roleName: "",
});
//搜索框的数据
const keywords = ref<string>("");
//实际用于搜索的数据
const roleName = ref<string>("");
//用于控制抽屉
const drawer = ref(false);
//树型结构的数据
const props = {
  label: "name",
  children: "children",
};
const treeData = ref<menuResDataItem[]>([]);
//用于记录树型结构选中的节点
const selectedKeys = ref<number[]>([]);
//获取树的实例
const tree = ref();
//角色id，用于记录当前的树是属于哪个角色的
const roleId = ref<number>();
//获取数据
async function getRoleData(page: number, limit: number) {
  const res = await getRole(page, limit, roleName.value);
  if (res.code === 200) {
    disabled.value = false;
    tableData.value = res.data.records;
    total.value = res.data.total;
  } else {
    disabled.value = true;
    ElMessage.error({
      message: "数据获取失败，请重新获取!",
    });
  }
}
getRoleData(page.value, limit.value);
function handleSizeChange(val: number) {
  limit.value = val;
  page.value = 1;
  getRoleData(page.value, limit.value);
}
function handleCurrentChange(val: number) {
  page.value = val;
  getRoleData(page.value, limit.value);
}
//添加角色的回调
function addRole() {
  Object.assign(updateRoleForm.value, {
    id: "",
    roleName: "",
  });
  dialogVisible.value = true;
}
//更新角色的回调
function updateRole(row: any) {
  dialogVisible.value = true;
  Object.assign(updateRoleForm.value, row);
}
//确认的回调
async function confirm() {
  const res = await updateRoleReq(updateRoleForm.value);
  if (res.code === 200) {
    ElMessage.success({
      message: updateRoleForm.value.id ? "更新成功" : "添加成功",
    });
    page.value = updateRoleForm.value.id ? page.value : (page.value = 1);
    getRoleData(page.value, page.value);
  } else {
    ElMessage.error({ message: res.data as string });
  }
}
//删除的回调
async function del(row: any) {
  const res = await delRole(row.id);
  if (res.code === 200) {
    ElMessage.success({ message: "删除成功" });
    page.value =
      tableData.value.length > 1 && page.value > 1 ? page.value : page.value--;
    getRoleData(page.value, limit.value);
  } else {
    ElMessage.error({ message: "删除失败" });
  }
}
//搜索的回调
async function search() {
  roleName.value = keywords.value;
  keywords.value = "";
  page.value = 1;
  getRoleData(page.value, limit.value);
}
//重置的回调
async function reset() {
  keywords.value = "";
  roleName.value = keywords.value;
  page.value = 1;
  limit.value = 10;
  getRoleData(page.value, limit.value);
}
//找出选中节点的keys
function selectKey(tree: menuResDataItem[]) {
  tree.forEach((item: menuResDataItem) => {
    if (!item.children.length && item.select) {
      selectedKeys.value.push(item.id);
    } else if (item.children.length) {
      selectKey(item.children);
    }
  });
}
//分配角色的回调
async function distriRole(row: any) {
  drawer.value = true;
  selectedKeys.value = [];
  roleId.value = row.id;
  const res = await getMenuByRoleId(row.id);
  treeData.value = res.data;
  selectKey(treeData.value as any[]);
  tree.value.setCheckedKeys(selectedKeys.value);
}
//drawer的确认回调
async function confirmClick() {
  selectedKeys.value = [];
  selectKey(treeData.value);
  const res = await assignPermission(
    roleId.value as number,
    selectedKeys.value,
  );
  if (res.code === 200) {
    ElMessage.success({ message: "分配角色成功!" });
    drawer.value = false;
    window.location.reload();
  } else {
    ElMessage.error({
      message: "分配角色失败",
    });
  }
}
//drawer的取消回调
function cancelClick() {
  drawer.value = false;
}
//帮助选中折叠部分(因为折叠后handleCheckChange获取不到变化)
function helpSelect(data: menuResDataItem[], checkStatus: boolean) {
  data.forEach((item: menuResDataItem) => {
    if (item.children.length && item.select !== checkStatus) {
      item.select = checkStatus;
      helpSelect(item.children, checkStatus);
    } else if (!item.children.length && item.select !== checkStatus) {
      item.select = checkStatus;
    }
  });
}
//勾选菜单权限的回调
function handleCheckChange(
  data: menuResDataItem,
  checked: boolean,
  isNotAll: boolean,
) {
  data.select = checked;
  if (!isNotAll) {
    helpSelect(data.children, checked);
  }
}
</script>
<script lang="ts">
export default { name: "rolemana" };
</script>
<style scoped lang="scss"></style>
