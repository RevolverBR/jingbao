<template>
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
        <router-link :to="`/Shop/${item._id}`" v-for="item in nearbyList" :key="item._id">
            <ShopInfo :item="item" />
        </router-link>
    </div>
</template>

<script>
import { ref } from "vue";
import { getNearbyList } from "../../api";

import ShopInfo from "../../components/ShopInfo.vue";

//获取店铺数据
const useGetNearbyListEffect = () => {
    const nearbyList = ref([]);

    const getNearbyListFun = async () => {
        const result = await getNearbyList('/store')
        if (result?.code === 0 && result?.data?.length) {
                nearbyList.value = result.data;
            }
        };
    getNearbyListFun();

    return { nearbyList };
};

export default {
    name: "Nearby",
    components: { ShopInfo },
    setup() {
        const { nearbyList } = useGetNearbyListEffect();

        return { nearbyList };
    },
};
</script>

<style lang='scss' scoped >
@import "../../style/viriables.scss";

.nearby {
    &__title {
        margin: 0.16rem 0 0.04rem 0;
        font-size: 0.18rem;
        font-weight: normal;
        color: $content-fontcolor;
    }
    a {
        text-decoration: none;
    }
}
</style>