<template>
  <PageWrapper>
    <div class="lg:flex">
      <div class="tool">
        <div class="list">
          <div
            :class="{
              item: true,
              active: active === item,
            }"
            v-for="item in toolList"
            :key="item"
            @click="handleChangeTool(item)"
            >{{ item }}</div
          >
        </div>
        <div class="clear" @click="handleStop">关闭</div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import RainEffect from '/@/utils/cesium/rainEffect';
  import * as Cesium from 'cesium';

  const toolList = ['小雨', '中雨', '大雨'];
  const active = ref('');
  let rainEffect: RainEffect;

  async function handleChangeTool(item) {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(40866);
  viewer.scene.primitives.add(tileset);
  viewer.zoomTo(tileset);
  return
    // 开启下雨效果
    if (!rainEffect) {
      rainEffect = new RainEffect();
    }
    switch (item) {
      case '小雨':
        rainEffect.start({
          tiltAngle: -0.1, //倾斜角度
          rainSize: 1, // 雨大小
          rainSpeed: 120.0, // 雨速
        });
        break;
      case '中雨':
        rainEffect.start({
          tiltAngle: -0.1, //倾斜角度
          rainSize: 0.6, // 雨大小
          rainSpeed: 120.0, // 雨速
        });
        break;
      case '大雨':
        rainEffect.start({
          tiltAngle: -0.1, //倾斜角度
          rainSize: 0.2, // 雨大小
          rainSpeed: 120.0, // 雨速
        });
        break;
    }
    active.value = item;
  }

  function handleStop() {
    rainEffect.stop();
    // rainEffect = null;
  }
</script>
<style lang="less" scoped>
  .tool {
    position: absolute;
    z-index: 10;
    top: 10px;
    left: 8px;
    display: flex;
    .list {
      display: flex;
      border-radius: 4px;
      background-color: rgba(255, 255, 255);
      .item {
        width: 70px;
        height: 30px;
        text-align: center;
        border-right: 1px solid #ccc;
        line-height: 30px;
        cursor: pointer;
        &.active {
          background: #209fdb;
          color: #fff;
        }
      }
    }
    .clear {
      width: 70px;
      height: 30px;
      margin-left: 10px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      background-color: rgba(255, 255, 255);
      border-radius: 4px;
    }
  }
</style>
