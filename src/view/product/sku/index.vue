<template>
  <div>
    <el-card style="margin: 1.25rem">
      <el-table
        border
        show-overflow-tooltip
        style="margin-bottom: 0.625rem"
        :data="tableData"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="200"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="200"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="默认图片" width="200">
          <template #="{ row }">
            <LazyLoadImg
              :imgSrc="row.skuDefaultImg"
              width="100px"
              height="100px"
              :key="row.skuDefaultImg"
            ></LazyLoadImg>
          </template>
        </el-table-column>
        <el-table-column
          label="重量(克)"
          width="200"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格(元)"
          width="200"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #="{ row }">
            <el-button
              :type="row.isSale ? 'success' : 'primary'"
              :icon="row.isSale ? 'Bottom' : 'Top'"
              @click="grounding(row)"
              circle
              v-hasBtnAuth="'btn.Sku.updown'"
            ></el-button>
            <el-button
              type="warning"
              icon="Edit"
              circle
              @click="edit"
              v-hasBtnAuth="'btn.Sku.update'"
            ></el-button>
            <el-button
              type="info"
              icon="InfoFilled"
              circle
              @click="showDetail(row)"
              v-hasBtnAuth="'btn.Sku.detail'"
            ></el-button>
            <el-button
              type="danger"
              icon="Delete"
              circle
              @click="deleteSku(row)"
              v-hasBtnAuth="'btn.Sku.remove'"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 40]"
        :disabled="disabled"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-drawer
      v-model="drawer"
      title="查看商品的详情"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-row style="margin-bottom: 0.625rem">
        <el-col :span="8">名称</el-col>
        <el-col :span="16">{{ drawerData.skuName }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 0.625rem">
        <el-col :span="8">描述 </el-col>
        <el-col :span="16">{{ drawerData.skuDesc }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 0.625rem">
        <el-col :span="8">价格</el-col>
        <el-col :span="16">{{ drawerData.price }}</el-col>
      </el-row>
      <el-row style="margin-bottom: 0.625rem">
        <el-col :span="8">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="item in drawerData.skuAttrValueList"
            :key="item.attrId"
            style="margin-bottom: 0.625rem"
          >
            {{ item.attrName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 0.625rem">
        <el-col :span="8">销售属性</el-col>
        <el-col :span="16"
          ><el-tag
            v-for="item in drawerData.skuSaleAttrValueList"
            :key="item.saleAttrId"
            style="margin-bottom: 0.625rem"
          >
            {{ item.saleAttrName }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row style="margin-bottom: 0.625rem">
        <el-col :span="8">商品图片</el-col>
        <el-col :span="16">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item
              v-for="item in drawerData.skuImageList"
              :key="item.imgUrl"
            >
              <img
                :src="item.imgUrl"
                justify="center"
                alt=""
                style="width: 100%; object-fit: cover"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  showSkuByPage,
  editSale,
  delSku,
  getDetail,
} from "@/api/product/sku/index";
import { SkuForm } from "@/api/product/sku/type";
import { ElMessage } from "element-plus";
import LazyLoadImg from "@/components/lazyLoadImg/index.vue";
//记录当前页
const page = ref(1);
//一页展示的数据数
const limit = ref(10);
//记录数据总数
const total = ref(0);
//控制分页是否能使用
const disabled = ref(false);
//存储sku数据
const tableData = ref<SkuForm[]>([]);
//控制抽屉的开关
const drawer = ref(false);
//drawer的数据
const drawerData = ref<SkuForm>({
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
//初始化数据
async function getData(page: number, limit: number) {
  const res = await showSkuByPage(page, limit);
  if (res.code === 200) {
    tableData.value = res.data?.records as SkuForm[];
    total.value = res.data?.total as number;
  } else {
    ElMessage.error({
      message: "获取数据失败，请刷新重试!",
    });
  }
}
getData(page.value, limit.value);
//页面大小变化的回调
function handleSizeChange(value: number) {
  limit.value = value;
  getData(page.value, limit.value);
}
//当前页变化的回调
function handleCurrentChange(value: number) {
  page.value = value;
  getData(page.value, limit.value);
}
//上架按钮的回调
async function grounding(row: any) {
  const res = await editSale(row.isSale === 1 ? 0 : 1, row.id);
  if (res.code === 200) {
    row.isSale = row.isSale === 1 ? 0 : 1;
    ElMessage.success({ message: row.isSale ? "上架成功" : "下架成功" });
  } else {
    ElMessage.error({ message: res.data as string });
  }
}
//编辑的回调
function edit() {
  ElMessage.success({ message: "啊啊啊啊，功能还没做!" });
}
//删除的回调
async function deleteSku(row: any) {
  const res = await delSku(row.id);
  if (res.code === 200) {
    ElMessage.success({ message: "删除成功" });
    if (tableData.value.length < 2 && page.value > 1) {
      page.value -= 1;
    }
    getData(page.value, limit.value);
  } else {
    ElMessage.error({ message: res.data as string });
  }
}
//展示详情页
async function showDetail(row: any) {
  const res = await getDetail(row.spuId);
  if (res.code === 200) {
    drawerData.value = row;
    drawer.value = true;
  } else {
    ElMessage.error({
      message: "获取数据失败，请刷新重试!",
    });
  }
}
//抽屉关闭执行的回调
function handleClose() {
  drawer.value = false;
}
</script>
<script lang="ts">
export default { name: "Sku" };
</script>
<style scoped lang="scss"></style>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
