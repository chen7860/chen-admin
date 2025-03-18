// import type { AppRouteModule } from '/@/router/types';

// import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

// const dashboard: AppRouteModule = {
//   path: '/screenshot',
//   name: 'Screenshot',
//   component: LAYOUT,
//   redirect: '/screenshot/index',
//   meta: {
//     hideChildrenInMenu: true,
//     icon: 'simple-icons:about-dot-me',
//     title: t('routes.dashboard.tool'),
//     orderNo: 100000,
//   },
//   children: [
//     {
//       path: 'screenshot',
//       name: 'screenshot',
//       component: () => import('/@/views/dashboard/screenshot/index.vue'),
//       meta: {
//         title: t('routes.dashboard.screenshot'),
//       },
//     },
//   ],
// };

// export default dashboard;
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/tool',
  name: 'Tool',
  component: LAYOUT,
  redirect: '/tool/screenshot',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.tool'),
  },
  children: [
    {
      path: 'screenshot',
      name: 'Screenshot',
      component: () => import('/@/views/tool/screenshot/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.dashboard.screenshot'),
      },
    },
  ],
};

export default dashboard;
