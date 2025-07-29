<template>
  <PageWrapper>
    <div class="lg:flex"> </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import LineOfMotion from '/@/utils/cesium/lineOfMotion';

  onMounted(() => {
    init();
  });

  function init() {
    const lineOfMotion = new LineOfMotion(window.viewer);
    lineOfMotion.createFlowingPath([113.135, 23.028, 113.3245, 23.1065]);
  }
</script>
