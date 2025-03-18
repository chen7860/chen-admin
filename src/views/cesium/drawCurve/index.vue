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
        <div class="clear" @click="handleClear">清除</div>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import BaseDraw from '/@/utils/cesium/draw';
  import { message } from 'ant-design-vue';

  const toolList = ['矩形', '圆形', '曲线'];
  const active = ref('');
  let baseDraw: BaseDraw;

  function handleChangeTool(item) {
    if (!baseDraw) {
      baseDraw = new BaseDraw();
    }
    baseDraw.clearAll();
    active.value = item;
    message.info('单击屏幕开始绘制，右键结束绘制');
    switch (item) {
      case '矩形':
        baseDraw.drawRectangle();
        break;
      case '圆形':
        baseDraw.drawCircle('#7F4538');
        break;
      case '曲线':
        baseDraw.drawCurve('#7F4538', (curveGeojson) => {
          console.log(curveGeojson);
        });
        break;
    }
  }

  // 清除
  function handleClear() {
    switch (active.value) {
      case '矩形':
        break;
      case '圆形':
        baseDraw.clearCircle();
        baseDraw.drawCircle('#7F4538');
        break;
      case '曲线':
        baseDraw.clearCurve();
        baseDraw.drawCurve('#7F4538', (curveGeojson) => {
          console.log(curveGeojson);
        });
        break;
    }
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
