// 矩阵图像
import * as Cesium from 'cesium';
import { createApp, h } from 'vue';
// import {ScreenSpaceEventType} from "cesium";
import pop from './pop.vue';
import { ImageCreator } from './ImageCreator';

export default class dynamicImage {
  viewer;
  era5Data;
  legend;
  imageCreator;
  imgLayer;
  doc = document.getElementById('cesiumContainer'); //doc.offsetWidth页面宽度 offsetHeight页面高度
  labelDiv = document.createElement('div'); //文本容器
  text;
  instance;
  app;
  siteInfo;
  activeData; //当前打开弹窗的数据

  constructor(viewer, era5Data, rect, legend) {
    // console.log("DynamicImage:", era5Data, rect, legend)
    this.viewer = viewer;
    this.era5Data = era5Data;
    // console.log(era5Data);
    this.legend = legend;
    this.init(rect);
    //
  }

  init(rect) {
    if (this.viewer) {
      // const legend = JSON.parse(JSON.stringify(this.legend));
      const legend = {
        legendName: '气温',
        legendUnit: '(°C)',
        legendValList: [
          40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0, -2, -4, -6,
          -8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28, -30, -32, -34, -36, -38, -40,
        ],
        legendColorList: [
          '#670000',
          '#800500',
          '#9A0A00',
          '#B30F00',
          '#CC3C00',
          '#E66A00',
          '#FF9700',
          '#FFCB00',
          '#FFFF00',
          '#C2F10E',
          '#84E31C',
          '#47D52B',
          '#09C739',
          '#1EE392',
          '#33FFEA',
          '#9EF7F7',
          '#CBFBFB',
          '#A9CDF7',
          '#879FF3',
          '#6671EF',
          '#4443EB',
          '#5B5AE6',
          '#7170E1',
          '#8887DC',
          '#9F9ED6',
          '#B5B5D1',
          '#CCCCCC',
          '#BEC6CB',
          '#A3BAC9',
          '#96B4C8',
          '#88AEC7',
          '#7AA8C6',
          '#6DA2C5',
          '#5F9CC4',
          '#5296C3',
          '#4490C2',
          '#368AC1',
          '#2984C0',
          '#1B7EBF',
          '#0E78BE',
          '#0072BD',
        ],
        min: -2.16,
        max: 32.06,
        space: true,
      };
      // console.log("color:", legend.legendColorList.reverse())
      // console.log("min max:", legend.legendValList[0], legend.legendValList[legend.legendValList.length - 1])
      // this.imageCreator = new ImageCreator({colorCreator:{
      //     max: legend.legendValList[0],
      //     min: legend.legendValList[legend.legendValList.length - 1],
      //     step: 40,
      //     colorScale: legend.legendColorList.reverse(),
      //     opacity: 1
      // }});
      // console.log("初始化图片：")
      // console.log(legend.legendColorList, legend.legendValList)
      this.imageCreator = new ImageCreator({
        // max: legend.legendValList[0],
        // min: legend.legendValList[legend.legendValList.length - 1],
        // step: 4,
        legendColor: legend.legendColorList,
        legendVal: legend.legendValList,
        opacity: 0.8,
      });
      const first = this.era5Data[0];
      let maxLongitude, minLongitude, maxLatitude, minLatitude;
      if (rect) {
        maxLongitude = rect.maxLon;
        minLongitude = rect.minLon;
        maxLatitude = rect.maxLat;
        minLatitude = rect.minLat;
      } else {
        // console.log("first", first)
        maxLongitude = first[0][0]; //第一行第一列的值
        minLongitude = maxLongitude;
        maxLatitude = first[0][1];
        minLatitude = maxLatitude;
      }
      // console.log("rect", rect)
      // let datas = []
      let grids = [];
      if (!rect) {
        //找出最大最小经纬度
        for (let i = 0; i < this.era5Data.length; i++) {
          grids.push([]);
          for (let j = 0; j < this.era5Data[i].length; j++) {
            const longitude = this.era5Data[i][j][0];
            const latitude = this.era5Data[i][j][1];
            maxLongitude = Math.max(maxLongitude, longitude);
            maxLatitude = Math.max(maxLatitude, latitude);
            minLongitude = Math.min(minLongitude, longitude);
            minLatitude = Math.min(minLatitude, latitude);
            grids[i][j] = this.era5Data[i][j][2];
            // datas.push(jsonElement[2]);
          }
        }
      } else {
        grids = this.era5Data; //有传矩形范围进来，则数据是已经组装好的矩阵数据
      }

      // function sortLat(a,b) {
      //     return b[1] - a[1];//纬度递减
      // }
      // function sortLon(a,b) {
      //     return a[0] - b[0];//经度递增
      // }
      // this.era5Data.sort(sortLat)
      // console.log(this.era5Data)
      const header = {
        lo1: minLongitude,
        lo2: maxLongitude,
        la1: minLatitude,
        la2: maxLatitude,
        dx: 0.25,
        dy: 0.25,
        // nx: (maxLongitude - minLongitude) / 0.25+1,
        // ny: (maxLatitude - minLatitude) / 0.25+1,
        nx: this.era5Data[0].length,
        ny: this.era5Data.length,
      };
      // console.log("header:", header)
      this.imageCreator.setHeader(header);
      // let grids=[]
      // for(let i=0;i<header.ny;i++){
      //     grids.push([])
      // }
      // let index=-1;
      // let yIndex=0;
      // for (let i = 0; i <datas.length;i++) {
      //     if (i%header.ny==0){
      //         index++;
      //         yIndex=0;
      //         // console.log("=======")
      //     }
      //     grids[yIndex++][index]=datas[i]
      // }
      // let curLat = this.era5Data[0][1]
      // let row = []
      // console.log("length:", this.era5Data.length)
      // for(let i = 0; i < this.era5Data.length;i++) {
      //   if(curLat == this.era5Data[i][1]) {
      //     row.push(this.era5Data[i])
      //   } else {
      //     // row.sort(sortLon) //得到一行数据
      //     let r = []
      //     for(let j = 0; j < row.length; j++) {
      //         // r.push(row[j][2]) //只取数值
      //         r.push(row[j])
      //     }
      //     console.log("列数：", row.length)
      //     grids.push(r)
      //     row = []
      //     row.push(this.era5Data[i])
      //     curLat = this.era5Data[i][1]
      //   }
      // }
      // let header = {
      //     lo1: minLongitude - 0.125,
      //     lo2: maxLongitude - 0.125,
      //     la1: minLatitude - 0.125,
      //     la2: maxLatitude - 0.125,
      //     dx: 0.25,
      //     dy: 0.25,
      //     nx: grids[0].length,
      //     ny: grids.length
      // };
      // console.log("header:", header)
      // this.imageCreator.setHeader(header)

      // console.log("grids:", grids)
      this.imageCreator.setGrids(grids);
      this.imageCreator.getImageUrl().then((url) => {
        // 两种实现方式效果一致,使用下面的primitives方法导致在特定的区域会出现空白的图层,还有一个是需要开启2d渲染才能显示出来,所以选择使用第一种实现方式
        // this.imgLayer = this.viewer.imageryLayers.addImageryProvider(
        //   new Cesium.SingleTileImageryProvider({
        //     url: url,
        //     rectangle: Cesium.Rectangle.fromDegrees(
        //       minLongitude,
        //       minLatitude,
        //       maxLongitude,
        //       maxLatitude,
        //     ),
        //   }),
        // );
        // console.log("url:", url),
        this.imgLayer = this.viewer.scene.primitives.add(
          new Cesium.GroundPrimitive({
            geometryInstances: new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  minLongitude,
                  minLatitude,
                  maxLongitude,
                  maxLatitude,
                ),
                vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              }),
            }),
            appearance: new Cesium.EllipsoidSurfaceAppearance({
              aboveGround: false,
              material: new Cesium.Material({
                fabric: {
                  type: 'Image',
                  uniforms: {
                    image: url,
                  },
                },
              }),
            }),
          }),
        );
        // 地图定位到这个区间
        this.viewer.camera.flyTo({
          destination: Cesium.Rectangle.fromDegrees(
            minLongitude,
            minLatitude,
            maxLongitude,
            maxLatitude,
          ),
        });
        //换成 cesium的图片加载即可
        // let imageLayer = new ImageLayer({url:url,bounds:{west:minLongitude,south:minLatitude,east:maxLongitude,north:maxLatitude}});
        // imageLayer.addTo(map);
      });
    } else {
    }
  }

  getData(lon, lat) {
    for (let i = 0; i < this.era5Data.length; i++) {
      if (this.era5Data[i][0] == lon && this.era5Data[i][0] == lat) {
      }
    }
  }

  initPop() {
    if (this.viewer) {
      //
    }
  }

  callback(e) {
    const lng = Number(e.latLng.longitude),
      lat = Number(e.latLng.latitude);
    // if(this.activeData) {
    //     if(this.activeData[0] - 0.125 <= lng && lng <= this.activeData[0] + 0.125 && this.activeData[1] - 0.125 <= lat && lat <= this.activeData[1]) {
    //         return
    //     }
    // }
    if (
      this.activeData &&
      this.activeData[0] - 0.125 <= lng &&
      lng <= this.activeData[0] + 0.125 &&
      this.activeData[1] - 0.125 <= lat &&
      lat <= this.activeData[1]
    ) {
      return;
    }
    let flag = false;
    for (let i = 0; i < this.era5Data.length; i++) {
      //经纬度在某个格点的-0.125 ~ +0.125之间
      if (this.era5Data[i][0][1] - 0.125 <= lat && lat <= this.era5Data[i][0][1] + 0.125) {
        for (let j = 0; j < this.era5Data[i].length; j++) {
          if (
            this.era5Data[i][j][0] - 0.125 <= lng &&
            lng <= this.era5Data[i][j][0] &&
            this.imageCreator
          ) {
            flag = true;
            this.activeData = this.era5Data[i][j];
            this.siteInfo = this.era5Data[i][j];
            this.initMouseLabel(this.era5Data[i][j]);
          }
        }
      }
    }
    if (!flag && this.instance) {
      this.instance.$el.remove();
      this.app.unmount();
    }
    // let data = this.imageCreator ? this.imageCreator.getDataByLonLat(lng, lat) : null
    // if(this.imageCreator && data != null) {
    //     let same = false
    //     if(this.activeData && this.activeData[0] == data[0] && this.activeData[1] == data[1]) {
    //         same = true
    //     }
    //     if(!same) {
    //         this.activeData = data
    //         this.siteInfo = data
    //         this.initMouseLabel(data)
    //     }
    // } else {
    //     if (this.instance) {
    //         this.instance.$el.remove();
    //         this.app.unmount();
    //     }
    // }
  }

  initMouseLabel(data1) {
    if (this.instance) {
      this.instance.$el.remove();
      this.app.unmount();
    }

    const parent = document.createElement('div');
    this.app = createApp({
      render() {
        return h(pop);
      },
    });
    this.app.config.globalProperties.$era5data = data1;
    this.instance = this.app.mount(parent);
    this.viewer && this.viewer.cesiumWidget.container.appendChild(this.instance.$el);
    this.instance.$el.style.display = 'block';
    this.postRender();
  }

  addPostRender() {
    this.viewer && this.viewer.scene.postRender.addEventListener(this.postRender, this);
  }

  postRender() {
    if (!this.instance.$el || !this.instance.$el.style) {
      return;
    }
    const canvasHeight = this.viewer && this.viewer.scene.canvas.height;
    const windowPosition = new Cesium.Cartesian2();
    const cartesian = Cesium.Cartesian3.fromDegrees(this.siteInfo[0], this.siteInfo[1], 0);
    Cesium.SceneTransforms.wgs84ToWindowCoordinates(
      this.viewer && this.viewer.scene,
      cartesian,
      windowPosition,
    );
    this.instance.$el.style.bottom = canvasHeight - windowPosition.y + 10 + 'px';
    const elWidth = this.instance.$el.offsetWidth;
    this.instance.$el.style.left = windowPosition.x - elWidth / 2 + 120 + 'px';
  }

  // //只改变图元
  // changeImage() {

  // }

  clear() {
    if (this.instance) {
      this.instance.$el.remove();
      this.app.unmount();
    }
    if (this.imgLayer && this.viewer) {
      // this.viewer.scene.primitives.remove(this.imgLayer)

      this.viewer.imageryLayers.remove(this.imgLayer);
    }
    this.activeData = undefined;
  }
}
