import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const cesium: AppRouteModule = {
  path: '/cesium',
  name: 'Cesium',
  component: LAYOUT,
  redirect: '/cesium/lineOfMotion',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.cesium.cesium'),
  },
  children: [
    {
      path: 'lineOfMotion',
      name: 'LineOfMotion',
      component: () => import('/@/views/cesium/lineOfMotion/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.cesium.lineOfMotion'),
        useCesium: true,
      },
    },
    {
      path: 'distribution',
      name: 'Distribution',
      component: () => import('/@/views/cesium/distribution/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.cesium.distribution'),
        useCesium: true,
      },
    },
    {
      path: 'drawCurve',
      name: 'DrawCurve',
      component: () => import('/@/views/cesium/drawCurve/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.cesium.drawCurve'),
        useCesium: true,
      },
    },
    {
      path: 'rainEffect',
      name: 'rainEffect',
      component: () => import('/@/views/cesium/rainEffect/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.cesium.rainEffect'),
        useCesium: true,
      },
    },
  ],
};

export default cesium;
