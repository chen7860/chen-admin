import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/concurrency',
  name: 'Concurrency',
  component: LAYOUT,
  redirect: '/concurrency/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.concurrency'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'concurrencyPage',
      component: () => import('/@/views/concurrency/index.vue'),
      meta: {
        title: t('routes.dashboard.concurrency'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
