<template>
  <div class="container">
    <el-row>
      <el-col :span="12"></el-col>
      <el-col :span="12">
        <el-form
          ref="ruleFormRef"
          class="login_form"
          :model="userForm"
          :rules="rules"
          status-icon
        >
          <h1>hello</h1>
          <h2>欢迎来到backManaSys</h2>
          <el-form-item class="retract" prop="username"
            ><el-input
              placeholder="用户名"
              prefix-icon="UserFilled"
              v-model="userForm.username"
          /></el-form-item>
          <el-form-item class="retract" prop="password"
            ><el-input
              placeholder="密码"
              type="password"
              prefix-icon="Lock"
              show-password
              v-model="userForm.password"
          /></el-form-item>
          <el-form-item class="retract"
            ><el-button
              :loading="btnLodingFlag"
              class="btn"
              type="primary"
              @click="userLogin"
              >登录</el-button
            ></el-form-item
          >
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import { userInfo } from "@/store/modules/user.ts";
import { ElNotification } from "element-plus";
import getTime from "@/utils/getTime.ts";
import type { loginForm } from "@/api/user/type.ts";
import type { FormInstance, FormRules } from "element-plus";
import { useRoute, useRouter } from "vue-router";
const userForm = reactive<loginForm>({
  username: "",
  password: "",
});
const $router = useRouter();
const $route = useRoute();
//获取表单ref
const ruleFormRef = ref<FormInstance>();
//创建自定义校验规则
function verifyUsername(_: any, value: any, callback: any): void {
  if (/^[a-zA-Z0-9]{5,16}$/.test(value)) {
    callback();
  } else {
    callback(new Error("长度必须在5到16个字符之间"));
  }
}
function verifyPassword(_: any, value: any, callback: any): void {
  if (/^[a-zA-Z0-9]{5,16}$/.test(value)) {
    callback();
  } else {
    callback(new Error("长度必须在5到16个字符之间"));
  }
}

//按钮加载控制
let btnLodingFlag = ref(false);
const user = userInfo();
//设置表单验证
const rules = reactive<FormRules<loginForm>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { validator: verifyUsername, trigger: "change" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { validator: verifyPassword, trigger: "change" },
  ],
});

//用户登录逻辑
const userLogin = async () => {
  //判断表单是否校验成功
  if (!ruleFormRef.value) return;
  try {
    await ruleFormRef.value.validate();
  } catch (err) {
    return err;
  }
  btnLodingFlag.value = true;
  //发送请求
  try {
    await user.userLogin(userForm);
    const time: string = getTime();
    ElNotification.success({
      title: `Hi~,${time}`,
      message: `登录成功`,
      duration: 1000,
    });
    btnLodingFlag.value = false;

    $router.push(($route.query.redirect as string) || "/");
  } catch (err) {
    ElNotification.error({
      message: err as string,
      duration: 1000,
    });
    btnLodingFlag.value = false;
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  background: url("@/assets/images/login_form.png");
  top: 30vh;
  width: 80%;
  padding: 30px 50px;

  h1 {
    color: #ffffff;
    font-size: 40px;
  }

  h2 {
    color: #ffffff;
    font-size: 20px;
    margin: 20px 0;
  }
}

.retract {
  margin-left: 50px;
  margin-right: 50px;
}

.btn {
  width: 100%;
}
</style>
