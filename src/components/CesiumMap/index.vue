<template>
  <div id="cesium-map"></div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { initCesium } from '/@/utils/cesium';

  // 添加name
  defineOptions({
    name: 'CesiumMap',
  });

  onMounted(() => {
    new initCesium();
  });
</script>
<style lang="less" scoped>
  #cesium-map {
    position: fixed;
    left: 210px;
    top: 80px;
    width: calc(100vw - 210px);
    height: calc(100vh - 80px);
  }
</style>
