<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>

  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { L2Dwidget } from 'live2d-widget';
  import FrameLayout from '/@/layouts/iframe/index.vue';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';

  import { useMultipleTabStore } from '/@/store/modules/multipleTab';

  export default defineComponent({
    name: 'PageLayout',
    components: { FrameLayout },
    setup() {
      setTimeout(function () {
        L2Dwidget.init({
          model: {
            jsonPath:
            'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
          },
          dialog: {
            enable: true, //是否开启对话框
            script: {
              //每20s，显示一言（调用一言Api返回的句子）
              'every idle 20s': '$hitokoto$',
              //触摸到class='star'对象,将会展示的文字
              'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
              //触摸到身体
              'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
              //触摸到头部
              'tap face': '~~',
            },
          },
        });
        // L2Dwidget.on('tap', (name) => {
        //   console.log(name);
        //   // if (document.querySelector('#live2d-widget')) {
        //   document.querySelector('#live2d-widget')?.remove();
        //   // }
        //   L2Dwidget.init({
        //     model: {
        //       jsonPath:
        //         'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
        //     },
        //     dialog: {
        //       enable: true, //是否开启对话框
        //       script: {
        //         //每20s，显示一言（调用一言Api返回的句子）
        //         'every idle 20s': '$hitokoto$',
        //         //触摸到class='star'对象,将会展示的文字
        //         'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
        //         //触摸到身体
        //         'tap body': '害羞⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄',
        //         //触摸到头部
        //         'tap face': '~~',
        //       },
        //     },
        //   });
        // });
      }, 1000);
      const { getShowMultipleTab } = useMultipleTabSetting();
      const tabStore = useMultipleTabStore();

      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();

      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
          return [];
        }
        return tabStore.getCachedTabList;
      });

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
        getCanEmbedIFramePage,
      };
    },
  });
</script>
