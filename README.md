<!--
 * @Descripttion: ----描述----
 * @version: 1.0
 * @Author: 张鹏
 * @Date: 2021-12-15 13:56:05
 * @LastEditors: 张鹏
 * @LastEditTime: 2021-12-15 16:25:07
-->

## leaflet 多种地图的点位纠偏

## 运行步骤：

内网安装 @shzl/shzl-leaflet

- 1、全局安装`@shzl/shzl-leaflet`
- 2、引入方法 传入 leaflet 参数即可

```bash
# main.js
import {pointCorrection} from '@shzl/shzl-leaflet';
pointCorrection(L)
```

## 使用方法

```js
this.map = L.map(this.$refs.map, {
minZoom: 3,
maxZoom: 18,
attributionControl: false,
center: this.center,
zoom: 12,
//   crs: L.CRS.Baidu,//使用百度外网时候需要放开
})
var normalMap = L.tileLayer.chinaProvider('TianDiTu.Inner.Map', {
maxZoom: 18,
minZoom: 5,
}).addto(this.map),//设置默认值
TianMap = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
maxZoom: 18,
minZoom: 5,
}),
satelliteMap = L.tileLayer.chinaProvider('Baidu.Satellite.Map', {
maxZoom: 18,
minZoom: 5,
}),
annotionMap = L.tileLayer.chinaProvider('Baidu.Satellite.Annotion', {
  maxZoom: 18,
  minZoom: 5,
}),
normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
  maxZoom: 18,
  minZoom: 5,
})
var baseLayers = {
  内网地图: normalMap,
  影像: satelliteMap,
  高德: normalm,
  天地图: TianMap,
}
 
var overlayLayers = {
  标注: annotionMap,
}
L.control.layers(baseLayers, overlayLayers).addTo(this.map)
```
## 方法 （Map图层 Annotion标注）
##### TianDiTu地图

| 参数名  | 说明                                     | 
| ------- | ---------------------------------------- | 
| Normal | 普通图层  （Map，Annotion）            | 
| Satellite | 卫星图 （Map，Annotion）  | 
| Terrain | 地形图 （Map，Annotion）                      | 
| Inner   | 百度内网地图   （Map）                              | 

##### gaode地图

| 参数名  | 说明                                     | 
| ------- | ---------------------------------------- | 
| Normal | 普通图层  （Map）            | 
| Satellite | 卫星图（Map，Annotion） | 


 ##### Google地图

| 参数名  | 说明                                     | 
| ------- | ---------------------------------------- | 
| Normal | 普通图层 （ Map）            | 
| Satellite | 卫星图 （Map，Annotion）| 

##### baidu地图

|  参数名   | 说明  |
|  ----  | ----  |
| Normal  | 普通图层   （ Map）  |
| Satellite  | 卫星图  （Map，Annotion） |

##### Geoq地图

|  参数名   | 说明  |
|  ----  | ----  |
| Normal  | 普通图层  （Map，Gray,PurplishBlue,Warm）  |
| theme  | Hydro |
