<template>
  <PageWrapper title="关于ddd">
    <template #headerContent>
      <div class="flex justify-between items-center"> 123 </div>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { getConcurrencyData } from '/@/api/sys/concurrency';
  import { ref, onMounted } from 'vue';

  function fetchData() {
    const promiseArr: Promise<any>[] = [];
    for (let i = 0; i < 200; i++) {
      promiseArr.push(getConcurrencyData());
    }
    handQueue(promiseArr);
  }

  const handQueue = (
    reqs, // 请求总数
  ) => {
    reqs = reqs || [];
    const requestQueue = (concurrency) => {
      concurrency = concurrency || 6; // 最大并发数
      const queue = []; // 请求池
      let current = 0;

      const dequeue = () => {
        while (current < concurrency && queue.length) {
          current++;
          const requestPromiseFactory = queue.shift(); // 出列
          requestPromiseFactory().then(() => {
              // 成功的请求逻辑
              console.log('请求成功');
            })
            .catch((error) => {
              // 失败
              console.log(error);
            })
            .finally(() => {
              current--;
              dequeue();
            });
        }
      };

      return (requestPromiseFactory) => {
        queue.push(requestPromiseFactory); // 入队
        dequeue();
      };
    };

    const enqueue = requestQueue(6);
    for (let i = 0; i < reqs.length; i++) {
      enqueue(() => reqs[i]);
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>
