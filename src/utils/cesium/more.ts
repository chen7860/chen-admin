import { Cartesian3, Math } from 'cesium';

export function myFly() {
  window.viewer.camera.setView({
    destination: Cartesian3.fromDegrees(113.145, 23.031, 100000),
    duration: 2, // 飞行持续时间（秒）
    orientation: {
      heading: Math.toRadians(0.0), // 方向
      pitch: Math.toRadians(-90.0), // 俯仰角
      roll: 0.0, // 滚转角
    },
  });
}
