<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      />
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register__button" @click="handleRegister">注册</div>
    <div class="wrapper__register__link" @click="handleToLogin">
      已有账号去登录
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 注册逻辑
const useRegisterEffect = (showToastFun) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "", ensurement: "" });

  // 注册校验
  const handleRegister = async () => {
    if (username.trim() !== "" && password.trim() !== "") {
      try {
        const result = await post("/api/user/register", {
          username: data.username,
          password: data.password,
          ensurement: data.ensurement,
        });
        if (result?.errno === 0) {
          // localStorage.isLogin = true;
          router.push({ name: "Login" });
        } else {
          showToastFun("注册失败");
        }
      } catch (e) {
        showToastFun("请求失败");
      }
    } else {
      showToastFun("请输入正确的用户名和密码");
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { username, password, ensurement, handleRegister };
};

const useToLoginEffect = () => {
  const router = useRouter();
  // 去登录界面
  const handleToLogin = () => {
    router.push({ name: "Login" });
  };
  return { handleToLogin };
};

export default {
  name: "Register",
  components: { Toast },
  setup() {
    const { showToast, toastMessage, showToastFun } = useToastEffect();
    const {
      username,
      password,
      ensurement,
      handleRegister,
    } = useRegisterEffect(showToastFun);
    const { handleToLogin } = useToLoginEffect();

    return {
      showToast,
      toastMessage,
      username,
      password,
      ensurement,
      handleRegister,
      handleToLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, 0.1);
    border-radius: .06rem;
    &__content {
      line-height: 0.48rem;
      border: none;
      outline: none;
      width: 100%;
      font-size: 0.16rem;
      color: $content-login-color1;
      &::placeholder {
        color: $content-login-color1;
      }
    }
  }
  &__register__button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    text-align: center;
    font-size: 0.16rem;
    color: #fff;
  }
  &__register__link {
    text-align: center;
    font-size: .14rem;
    color: $content-login-color1;
  }
}
</style>