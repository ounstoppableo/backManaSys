<template>
  <div>
    <Selector :scence="scence"></Selector>
    <el-card v-show="scence === 0" style="margin: 1.25rem">
      <el-button
        type="primary"
        style="margin-bottom: 0.625rem"
        :disabled="flag"
        @click="switchSence"
        v-hasBtnAuth="'btn.Attr.add'"
      >
        <template #icon>
          <el-icon>
            <Plus />
          </el-icon>
        </template>
        添加平台属性
      </el-button>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <el-table-column prop="attrName" label="属性名称" width="150px" />
        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 0.3125rem"
              >{{ item.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150px">
          <template #="{ row }">
            <el-button
              type="warning"
              :icon="Edit"
              circle
              @click="editProp(row)"
              v-hasBtnAuth="'btn.Attr.update'"
            ></el-button>
            <el-popconfirm
              :title="`您确定要删除${row.attrName}属性吗?`"
              @confirm="delProp(row)"
              width="250px"
            >
              <template #reference>
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  v-hasBtnAuth="'btn.Attr.remove'"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card v-show="scence === 1" style="margin: 1.25rem">
      <el-form :model="addPropertyForm" :rules="rules" ref="formRef">
        <el-form-item label="属性名称" prop="attrName" style="width: 15.625rem">
          <el-input
            v-model="addPropertyForm.attrName"
            placeholder="请您输入属性名字"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Plus" @click="formAddProperty"
            >添加属性值</el-button
          >
          <el-button @click="scence = 0">取消</el-button>
        </el-form-item>
        <el-form-item prop="attrValueList">
          <el-table
            :data="addPropertyForm.attrValueList"
            style="width: 100%"
            border
          >
            <el-table-column
              label="序号"
              width="80"
              type="index"
              align="center"
            />
            <el-table-column prop="valueName" label="属性值">
              <template #="{ row, $index }">
                <el-input
                  :ref="(vc: any) => (inputArr[$index] = vc)"
                  v-model="row.valueName"
                  placeholder="请您输入属性值"
                  :key="$index"
                  v-show="row.flag"
                  @blur="inputBlur(row, $index)"
                />
                <p v-show="!row.flag" @click="foucus(row, $index)">
                  {{ row.valueName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #="{ $index }">
                <el-button
                  type="danger"
                  :icon="Delete"
                  circle
                  @click="deleteValue($index)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirm">保存</el-button>
          <el-button @click="scence = 0">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, ref, nextTick } from "vue";
import selector from "@/store/modules/selector";
import {
  getProperty,
  addProperty,
  delProperty,
} from "@/api/product/property/index";
import type { AddProperty, attrValueItem } from "@/api/product/property/type";
import { ElMessage } from "element-plus";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
import type { FormRules } from "element-plus";
//商品属性值列表
const tableData = reactive<AddProperty[]>([]);
const selectorData = selector();
//用于控制按钮状态
const flag = ref(true);
//用于控制表格场景
const scence = ref(0);
//存储待添加属性值的对象
const addPropertyForm: AddProperty = reactive({
  attrName: "",
  attrValueList: [],
  categoryId: selectorData.cate3Id,
  categoryLevel: 3,
  id: "",
});
//拿到表单dom对象
const formRef = ref();
//获取表单数据
async function getTableData() {
  const res = await getProperty(
    selectorData.cate1Id,
    selectorData.cate2Id,
    selectorData.cate3Id,
  );
  let length = tableData.length;
  for (let i = 0; i < length; i++) {
    tableData.pop();
  }
  if (res.code === 200) {
    res.data.forEach((item: AddProperty) => tableData.push(item));
  } else {
    ElMessage.error({
      message: "请求数据失败，请刷新重试",
    });
  }
}
//获取所有input的ref
let inputArr: Array<any> = [];
watch(
  () => selectorData.cate3Id,
  async () => {
    //cate3Id一发生变化就清除原列表
    let length = tableData.length;
    for (let i = 0; i < length; i++) {
      tableData.pop();
    }
    if (selectorData.cate3Id) {
      flag.value = false;
      addPropertyForm.categoryId = selectorData.cate3Id;
      getTableData();
    } else {
      flag.value = true;
    }
  },
);
//切换场景
function switchSence() {
  formRef.value?.resetFields();
  addPropertyForm.attrName = "";
  addPropertyForm.attrValueList = [];
  addPropertyForm.id = "";
  scence.value = 1;
  nextTick(() => {
    inputArr = [];
  });
}
//添加属性值的回调
function formAddProperty() {
  addPropertyForm.attrValueList.push({
    attrId: "",
    id: "",
    valueName: "",
    flag: true,
  });
  nextTick(() => {
    inputArr[inputArr.length - 1].focus();
  });
}
//提交填写的属性值
async function confirm() {
  await formRef.value?.validate();
  //防止属性重复
  if (!addPropertyForm.id) {
    if (
      tableData.filter((item) => item.attrName === addPropertyForm.attrName)
        .length > 0
    ) {
      ElMessage.error({
        message: "属性名不能重复!",
      });
      throw new Error("属性名不能重复!");
    }
  } else {
    const arr: AddProperty[] = tableData.filter(
      (item) => item.attrName === addPropertyForm.attrName,
    );
    arr.forEach((item) => {
      if (item.id !== addPropertyForm.id) {
        ElMessage.error({
          message: "属性名不能重复!",
        });
        throw new Error("属性名不能重复!");
      }
    });
  }
  const res = await addProperty(addPropertyForm);
  if (res.code === 200) {
    ElMessage.success({
      message: addPropertyForm.id ? "修改成功" : "添加成功",
    });
    scence.value = 0;
    getTableData();
  } else {
    ElMessage.error({ message: res.data as string });
  }
}
//表单校验
const rules = reactive<FormRules<typeof addPropertyForm>>({
  attrName: [{ required: true, validator: validAttrName, trigger: "blur" }],
  attrValueList: [{ required: true, validator: validAttrList }],
});
function validAttrName(_: any, value: any, callback: any) {
  if (value.length >= 2 && value.length <= 10) {
    callback();
  } else {
    callback(new Error("请输入2~10位的字符串"));
  }
}
function validAttrList(_: any, value: any, callback: any) {
  if (value.length) {
    callback();
  } else {
    callback(new Error("请填写至少一个属性值!"));
  }
}
//添加属性值input失去焦点后的回调
function inputBlur(row: attrValueItem, index: number) {
  if (!row.valueName.trim()) {
    addPropertyForm.attrValueList.splice(index, 1);
  } else if (
    addPropertyForm.attrValueList.filter(
      (item) => item.valueName === row.valueName,
    ).length >= 2
  ) {
    ElMessage.error({
      message: "属性值不能重复!",
    });
    addPropertyForm.attrValueList.splice(index, 1);
  } else {
    row.flag = false;
  }
}
//点击p后获得焦点
function foucus(row: attrValueItem, index: number) {
  row.flag = true;
  inputArr[index].focus();
}
//属性值删除回调
function deleteValue(index: number) {
  addPropertyForm.attrValueList.splice(index, 1);
}
//编辑属性
function editProp(row: AddProperty) {
  switchSence();
  addPropertyForm.id = row.id;
  addPropertyForm.attrName = row.attrName;
  row.attrValueList.forEach((item: attrValueItem) =>
    addPropertyForm.attrValueList.push(item),
  );
}
//删除属性
async function delProp(row: AddProperty) {
  const res = await delProperty(row.id as number);
  if (res.code === 200) {
    getTableData();
    ElMessage.success({
      message: "删除成功",
    });
  } else {
    ElMessage.error({
      message: res.data as string,
    });
  }
}
</script>
<script lang="ts">
export default { name: "Property" };
</script>
<style scoped lang="scss"></style>
