import { Cartesian3, Material } from 'cesium';
import './PolylineOutlineMaterial';

export default class LineOfMotion {
  viewer;
  constructor(viewer) {
    this.viewer = viewer;
  }
  createFlowingPath(lngLatList) {
    window.viewer.entities.add({
      polyline: {
        positions: Cartesian3.fromDegreesArray(lngLatList),
        width: 30,
        material: new Material.ImageLineMaterialProperty(),
      },
    });
  }
}
