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
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login__button" @click="handleLogin">登录</div>
    <div class="wrapper__login__register" @click="handleToRegister">
      立即注册
    </div>
    <Toast v-if="showToast" :message="toastMessage" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

const useLoginEffect = (showToastFun) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });

  const handleLogin = async () => {
    const { username, password } = data;
    if (username.trim() !== "" && password.trim() !== "") {
      try {
        const result = await post("/api/user/login", {
          username: data.username,
          password: data.password,
        });
        if (result?.errno === 0) {
          localStorage.isLogin = true;
          router.push({ name: "Home" });
        } else {
          showToastFun("登录失败");
        }
      } catch (e) {
        showToastFun("请求失败");
      }
    } else {
      showToastFun("请输入正确的用户名和密码");
    }
  };

  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

const useRegisterEffect = () => {
  const router = useRouter();
  const handleToRegister = () => {
    router.push({ name: "Register" });
  };
  return { handleToRegister };
};

export default {
  name: "Login",
  components: { Toast },
  setup() {
    const { showToast, toastMessage, showToastFun } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToastFun);
    const { handleToRegister } = useRegisterEffect();
    return {
      handleLogin,
      handleToRegister,
      showToast,
      toastMessage,
      username,
      password,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  // background: #f9f9f9;
  &__img {
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin: 0 auto 0.4rem auto;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 .16rem;
    background: #F9F9F9;
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
  &__login__button {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    line-height: 0.48rem;
    background: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    text-align: center;
    font-size: 0.16rem;
    color: #fff;
  }
  &__login__register {
    text-align: center;
    font-size: .14rem;
    color: $content-login-color1;
  }
}
</style>