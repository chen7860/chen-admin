import arrow from '/@/assets/images/arrow.png';
import * as Cesium from 'cesium';

const defaultColor = Cesium.Color.TRANSPARENT;
const defaultImage = arrow;
const defaultImageimageW = 60; // 这里改成自己图片宽度
const defaultAnimation = false;
const defaultDuration = 3000;

function ImageLineMaterial(opt) {
  opt = Cesium.defaultValue(opt, Cesium.defaultValue.EMPTY_OBJECT);
  this._definitionChanged = new Cesium.Event();
  // 定义材质变量
  this._color = undefined;
  this._colorSubscription = undefined;
  this._backgroundColor = undefined;
  this._backgroundColorSubscription = undefined;
  this._image = undefined;
  this._imageSubscription = undefined;
  this._imageW = undefined;
  this._imageWSubscription = undefined;
  this._animation = undefined;
  this._animationSubscription = undefined;
  this._duration = undefined;
  this._durationSubscription = undefined;
  // 变量初始化
  this.color = opt.color || defaultColor; //颜色
  this.backgroundColor = opt.backgroundColor || defaultColor; //颜色
  this._image = opt.image || defaultImage; //材质图片
  this.imageW = opt.imageW || defaultImageimageW;
  this.animation = opt.animation || defaultAnimation;
  this.duration = opt.duration || defaultDuration;
  this._time = undefined;
}
// 材质类型
ImageLineMaterial.prototype.getType = function () {
  return 'ImageLine';
};
// 这个方法在每次渲染时被调用，result的参数会传入glsl中。
ImageLineMaterial.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    defaultColor,
    result.color,
  );
  result.backgroundColor = Cesium.Property.getValueOrClonedDefault(
    this._backgroundColor,
    time,
    defaultColor,
    result.backgroundColor,
  );
  result.image = this._image;
  result.imageW = this._imageW;
  result.animation = this._animation;
  if (this._time === undefined) {
    this._time = new Date().getTime();
  }
  result.time = ((new Date().getTime() - this._time) % this._duration) / this._duration;
  return result;
};

ImageLineMaterial.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof ImageLineMaterial &&
      Cesium.Property.equals(this._color, other._color) &&
      Cesium.Property.equals(this._backgroundColor, other._backgroundColor))
  );
};

Object.defineProperties(ImageLineMaterial.prototype, {
  isConstant: {
    get: function get() {
      return false;
    },
  },
  definitionChanged: {
    get: function get() {
      return this._definitionChanged;
    },
  },
  color: Cesium.createPropertyDescriptor('color'),
  backgroundColor: Cesium.createPropertyDescriptor('backgroundColor'),
  image: Cesium.createPropertyDescriptor('image'),
  imageW: Cesium.createPropertyDescriptor('imageW'),
  animation: Cesium.createPropertyDescriptor('animation'),
  duration: Cesium.createPropertyDescriptor('duration'),
});

Cesium.Material._materialCache.addMaterial('ImageLine', {
  fabric: {
    type: 'ImageLine',
    uniforms: {
      // uniforms参数跟我们上面定义的参数以及getValue方法中返回的result对应，这里值是默认值
      color: new Cesium.Color(1, 0, 0, 1.0),
      backgroundColor: new Cesium.Color(0, 0, 0, 0.0),
      image: '',
      imageW: 1,
      animation: false,
      duration: 30,
      time: 0,
    },
    // source编写glsl，可以使用uniforms参数，值来自getValue方法的result
    source: `
      in float v_polylineAngle;
      mat2 rotate(float rad) {
        float c = cos(rad);
        float s = sin(rad);
        return mat2(
            c, s,
            -s, c
        );
      }
      czm_material czm_getMaterial(czm_materialInput materialInput)
        {
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            vec2 pos = rotate(v_polylineAngle) * gl_FragCoord.xy;
            float s = pos.x / (imageW * czm_pixelRatio);
            float t = st.t;
            s = s-time;//增加运动效果
            vec4 colorImage = texture(image, vec2(fract(s), t));
            material.alpha = colorImage.a; 
            material.diffuse = colorImage.rgb; 
            return material;
        }
    `,
  },
  translucent: function translucent() {
    return true;
  },
});
Cesium.Material.ImageLineType = 'ImageLine';
Cesium.Material.ImageLineMaterialProperty = ImageLineMaterial;
