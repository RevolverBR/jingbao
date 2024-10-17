<template>
  <div class="loading">
    <div class="loading-content">
      <img src="./loading.gif" height="24" width="24" alt="">
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      title: '正在载入'
    }
  },
  methods: {
    setTimte(title) {
      this.title = title
    }
  }
}
</script>

<style class="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.loading-content {
  text-align: center;
}
.desc {
  line-height: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
