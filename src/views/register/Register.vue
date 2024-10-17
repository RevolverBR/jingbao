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
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleToLogin">
            已有账号去登录
        </div>
        <Toast v-if="showToast" :message="toastMessage" />
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { reactive, toRefs } from "@vue/reactivity";

//注册相关逻辑
const useRegisterEffect = (showToastFun) => {
    const router = useRouter();

    const data = reactive({
        username: "",
        password: "",
        ensurement: "",
    });

    //注册
    const handleRegister = async () => {
        try {
            if (data.username.trim() === "" && data.password.trim() === "" && data.ensurement.trim() === "") {
                showToastFun('请输入正确的用户名和密码');
                data.username = "";
                data.password = "";
                data.ensurement = "";
            } else {
                const result = await post("/api/user/register", {
                    username: data.username,
                    password: data.password,
                    ensurement: data.ensurement,
                });
                if (result?.errno === 0) {
                    showToastFun("注册成功");
                    setTimeout(() => {
                        router.push({ name: "Login" });
                    }, 2000);
                } else {
                    // alert("fail");
                    showToastFun("注册失败");
                }
            }
        } catch (e) {
            showToastFun("请求失败");
        }
    };

    //跳转到登录
    const handleToLogin = () => {
        router.push({ name: "Login" });
    };

    const { username, password, ensurement } = toRefs(data);

    return { handleRegister, handleToLogin, username, password, ensurement };
};

export default {
    name: "Rrgister",
    components: { Toast },
    setup() {
        const { showToast, toastMessage, showToastFun } = useToastEffect();
        const {
            handleRegister,
            handleToLogin,
            username,
            password,
            ensurement,
        } = useRegisterEffect(showToastFun);

        return {
            handleRegister,
            handleToLogin,
            username,
            password,
            ensurement,
            showToast,
            toastMessage,
        };
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
    &__img {
        display: block;
        margin: 0 auto 0.4rem auto;
        height: 0.66rem;
        width: 0.66rem;
    }
    &__input {
        height: 0.48rem;
        margin: 0 0.4rem 0.16rem 0.4rem;
        padding: 0 0.16rem;
        background: #f9f9f9;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        &__content {
            width: 100%;
            border: none;
            outline: none;
            line-height: 0.48rem;
            background: none;
            font-size: 0.16rem;
            &::placeholder {
                color: rgba(0, 0, 0, 0.5);
            }
        }
    }
    &__register-button {
        margin: 0.32rem 0.4rem 0.16rem 0.4rem;
        background: #0091ff;
        box-shadow: 0 0.04rem 0.08rem 0 rbga(0, 145, 255, 0.32);
        border-radius: 4px;
        color: #fff;
        line-height: 0.48rem;
        font-size: 0.16rem;
        text-align: center;
    }
    &__register-link {
        text-align: center;
        font-size: 0.14rem;
        color: rgba(0, 0, 0, 0.5);
    }
}
</style>