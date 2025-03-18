<template>
  <PageWrapper>
    <div class="lg:flex"> </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import DynamicImage from '/@/utils/cesium/dynamicImage/index.js';

  let matrixPic: any = null;

  onMounted(() => {
    getData();
  });

  async function getData() {
    try {
      const response = await fetch('/weather.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      addMatrixImage(data);
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  }

  function addMatrixImage(res) {
    if (matrixPic) {
      matrixPic.clear();
      matrixPic = null;
    }
    matrixPic = new DynamicImage(window.viewer, res.matrix, {
      minLon: res.bbox[0],
      maxLon: res.bbox[2],
      minLat: res.bbox[1],
      maxLat: res.bbox[3],
    });
  }
</script>
