import type { App } from 'vue';
import { Button } from './Button';
import CesiumMap from './CesiumMap/index.vue';

import {
  // Need
  Button as AntButton,
  Input,
  Layout,
} from 'ant-design-vue';

const compList = [AntButton.Group, CesiumMap];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout);
}
