import{P as n}from"./index.d6f853c0.js";import{a as s,K as m,o as l,k as u,B as c,n as d,j as g}from"./index.40f28117.js";import"./index.4f5af4cb.js";import"./index.4a603b3b.js";import"./useBreakpoint.aac64a46.js";import"./responsiveObserve.c900bce4.js";import"./useSize.d39be33d.js";import"./useWindowSizeFn.8d01d8dc.js";import"./useContentViewHeight.a9642e78.js";import"./index.b7896ea2.js";import"./transButton.cca87ed8.js";import"./ArrowLeftOutlined.e04bc070.js";var p="./assets/arrow.b5fc01d4.png";const o=Cesium.Color.TRANSPARENT,f=p,C=60,_=!1,h=3e3;function t(i){i=Cesium.defaultValue(i,Cesium.defaultValue.EMPTY_OBJECT),this._definitionChanged=new Cesium.Event,this._color=void 0,this._colorSubscription=void 0,this._backgroundColor=void 0,this._backgroundColorSubscription=void 0,this._image=void 0,this._imageSubscription=void 0,this._imageW=void 0,this._imageWSubscription=void 0,this._animation=void 0,this._animationSubscription=void 0,this._duration=void 0,this._durationSubscription=void 0,this.color=i.color||o,this.backgroundColor=i.backgroundColor||o,this._image=i.image||f,this.imageW=i.imageW||C,this.animation=i.animation||_,this.duration=i.duration||h,this._time=void 0}t.prototype.getType=function(){return"ImageLine"};t.prototype.getValue=function(i,e){return Cesium.defined(e)||(e={}),e.color=Cesium.Property.getValueOrClonedDefault(this._color,i,o,e.color),e.backgroundColor=Cesium.Property.getValueOrClonedDefault(this._backgroundColor,i,o,e.backgroundColor),e.image=this._image,e.imageW=this._imageW,e.animation=this._animation,this._time===void 0&&(this._time=new Date().getTime()),e.time=(new Date().getTime()-this._time)%this._duration/this._duration,e};t.prototype.equals=function(i){return this===i||i instanceof t&&Cesium.Property.equals(this._color,i._color)&&Cesium.Property.equals(this._backgroundColor,i._backgroundColor)};Object.defineProperties(t.prototype,{isConstant:{get:function(){return!1}},definitionChanged:{get:function(){return this._definitionChanged}},color:Cesium.createPropertyDescriptor("color"),backgroundColor:Cesium.createPropertyDescriptor("backgroundColor"),image:Cesium.createPropertyDescriptor("image"),imageW:Cesium.createPropertyDescriptor("imageW"),animation:Cesium.createPropertyDescriptor("animation"),duration:Cesium.createPropertyDescriptor("duration")});Cesium.Material._materialCache.addMaterial("ImageLine",{fabric:{type:"ImageLine",uniforms:{color:new Cesium.Color(1,0,0,1),backgroundColor:new Cesium.Color(0,0,0,0),image:"",imageW:1,animation:!1,duration:30,time:0},source:`
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
            s = s-time;//\u589E\u52A0\u8FD0\u52A8\u6548\u679C
            vec4 colorImage = texture(image, vec2(fract(s), t));
            material.alpha = colorImage.a; 
            material.diffuse = colorImage.rgb; 
            return material;
        }
    `},translucent:function(){return!0}});Cesium.Material.ImageLineType="ImageLine";Cesium.Material.ImageLineMaterialProperty=t;class v{constructor(e){this.viewer=e}createFlowingPath(e){window.viewer.entities.add({polyline:{positions:Cesium.Cartesian3.fromDegreesArray(e),width:30,material:new Cesium.Material.ImageLineMaterialProperty}})}}const T=s({__name:"index",setup(i){m(()=>{e()});function e(){new v(window.viewer).createFlowingPath([113.135,23.028,113.3245,23.1065])}return(r,a)=>(l(),u(g(n),null,{default:c(()=>a[0]||(a[0]=[d("div",{class:"lg:flex"},null,-1)])),_:1}))}});export{T as default};
