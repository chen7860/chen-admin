import * as Cesium from 'cesium';
import { myFly } from './more';

export class initCesium {
  constructor() {
    this.init();
  }

  init() {
    const viewer = new Cesium.Viewer('cesium-map', {
      // shadows: true,
      shouldAnimate: true,
      contextOptions: {
        webgl: {
          alpha: true,
          stencil: true,
          antialias: true,
          preserveDrawingBuffer: true,
        },
      },
      animation: false,
      infoBox: false,
      fullscreenButton: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      homeButton: false,
      sceneModePicker: false,
      geocoder: false,
      baseLayerPicker: false,
      timeline: false,
      // imageryProvider: false, // 禁用默认影像图层
      terrain: Cesium.Terrain.fromWorldTerrain(),
    });
    window.viewer = viewer;
    (viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none';

    // 加载天地图
    const tdtKey = '468f245cef15e7af8c5a6c3d59908f89'; // Replace with your Tianditu API key
    const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];

    // 影像底图
    // const tiandituImageryProvider = new Cesium.UrlTemplateImageryProvider({
    //   url: `https://t{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=${tdtKey}`,
    //   subdomains: subdomains,
    //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
    //   maximumLevel: 18,
    // });

    // 注记
    const tiandituTextProvider = new Cesium.UrlTemplateImageryProvider({
      url: `https://t{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles&tk=${tdtKey}`,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    });

    // viewer.imageryLayers.addImageryProvider(tiandituImageryProvider);
    viewer.imageryLayers.addImageryProvider(tiandituTextProvider);
    myFly();
  }

  // 注销地图实例
  destroy() {
    if (window.viewer) {
      window.viewer = null;
    }
  }
}
