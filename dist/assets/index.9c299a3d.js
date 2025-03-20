import{P as m}from"./index.d6f853c0.js";import{M as d,a as f,w as v,o as a,k as h,B as p,n as i,i as _,F as g,aG as S,r as x,t as C,j as w}from"./index.40f28117.js";import"./index.4f5af4cb.js";import"./index.4a603b3b.js";import"./useBreakpoint.aac64a46.js";import"./responsiveObserve.c900bce4.js";import"./useSize.d39be33d.js";import"./useWindowSizeFn.8d01d8dc.js";import"./useContentViewHeight.a9642e78.js";import"./index.b7896ea2.js";import"./transButton.cca87ed8.js";import"./ArrowLeftOutlined.e04bc070.js";class z{constructor(t,e){if(!t)throw new Error("no viewer object!");e=e||{},this.tiltAngle=Cesium.defaultValue(e.tiltAngle,-.6),this.rainSize=Cesium.defaultValue(e.rainSize,.3),this.rainSpeed=Cesium.defaultValue(e.rainSpeed,60),this.viewer=t,this.init()}init(){this.rainStage=new Cesium.PostProcessStage({name:"czm_rain",fragmentShader:this.rain(),uniforms:{tiltAngle:()=>this.tiltAngle,rainSize:()=>this.rainSize,rainSpeed:()=>this.rainSpeed}}),this.viewer.scene.postProcessStages.add(this.rainStage)}destroy(){!this.viewer||!this.rainStage||(this.viewer.scene.postProcessStages.remove(this.rainStage),delete this.tiltAngle,delete this.rainSize,delete this.rainSpeed)}show(t){this.rainStage.enabled=t}rain(){return`#version 300 es
            precision highp float;
            uniform sampler2D colorTexture;
            in vec2 v_textureCoordinates;
            uniform float tiltAngle;
            uniform float rainSize;
            uniform float rainSpeed;
            out vec4 fragColor;
            
            float hash(float x) {
                return fract(sin(x * 133.3) * 13.13);
            }
            void main(void) {
                float time = czm_frameNumber / rainSpeed;
                vec2 resolution = czm_viewport.zw;
                vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
                vec3 c = vec3(0.6, 0.7, 0.8);
                float a = tiltAngle;
                float si = sin(a), co = cos(a);
                uv *= mat2(co, -si, si, co);
                uv *= length(uv + vec2(0.0, 4.9)) * rainSize + 1.0;
                float v = 1.0 - sin(hash(floor(uv.x * 100.0)) * 2.0);
                float b = clamp(abs(sin(20.0 * time * v + uv.y * (5.0 / (2.0 + v)))) - 0.95, 0.0, 1.0) * 20.0;
                c *= v * b;
                fragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c, 1.0), 0.5);
            }
            `}}Cesium.Material.RainEffect=z;const y={class:"lg:flex"},E={class:"tool"},k={class:"list"},A=["onClick"],b=f({__name:"index",setup(s){const t=["\u5C0F\u96E8","\u4E2D\u96E8","\u5927\u96E8"],e=v("");let o;async function l(u){const r=await Cesium.Cesium3DTileset.fromIonAssetId(40866);viewer.scene.primitives.add(r),viewer.zoomTo(r)}function c(){o.stop()}return(u,r)=>(a(),h(w(m),null,{default:p(()=>[i("div",y,[i("div",E,[i("div",k,[(a(),_(g,null,S(t,n=>i("div",{class:x({item:!0,active:e.value===n}),key:n,onClick:P=>l(n)},C(n),11,A)),64))]),i("div",{class:"clear",onClick:c},"\u5173\u95ED")])])]),_:1}))}});var W=d(b,[["__scopeId","data-v-7960ee0a"]]);export{W as default};
