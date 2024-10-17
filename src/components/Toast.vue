<template>
    <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";

export default {
    props: ["message"],
};

export const useToastEffect = () => {
    const toastData = reactive({
        showToast: false,
        toastMessage: "",
    });

    const showToastFun = (message) => {
        toastData.showToast = true;
        toastData.toastMessage = message;
        setTimeout(() => {
            toastData.showToast = false;
            toastData.toastMessage = "";
        }, 2000);
    };

    const { showToast, toastMessage } = toRefs(toastData);

    return { showToast, toastMessage, showToastFun };
};
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.35);
    // background-color: blue;
    padding: 0.1rem;
    border-radius: 0.05rem;
    color: #fff;
}
</style>