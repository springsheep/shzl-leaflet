/*
 * @Descripttion: ----描述----
 * @version: 1.0
 * @Author: 张鹏
 * @Date: 2021-12-15 14:25:34
 * @LastEditors: 张鹏
 * @LastEditTime: 2021-12-15 16:13:04
 */
let pointCorrection = function pointCorrection(L) {
   if (L.Proj) {
      L.CRS.Baidu = new L.Proj.CRS(
         'EPSG:900913',
         '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
         {
            resolutions: (function() {
               var level = 19
               var res = []
               res[0] = Math.pow(2, 18)
               for (var i = 1; i < level; i++) {
                  res[i] = Math.pow(2, 18 - i)
               }
               return res
            })(),
            origin: [0, 0],
            bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244]),
         }
      )
   }

   L.TileLayer.ChinaProvider = L.TileLayer.extend({
      initialize: function(type, options) {
         // (type, Object)
         var providers = L.TileLayer.ChinaProvider.providers

         options = options || {}

         var parts = type.split('.')

         var providerName = parts[0]
         var mapName = parts[1]
         var mapType = parts[2]

         var url = providers[providerName][mapName][mapType]
         options.subdomains = providers[providerName].Subdomains
         options.key = options.key || providers[providerName].key

         if ('tms' in providers[providerName]) {
            options.tms = providers[providerName]['tms']
         }

         L.TileLayer.prototype.initialize.call(this, url, options)
      },
   })

   L.TileLayer.ChinaProvider.providers = {
      TianDiTu: {
         Normal: {
            Map: '//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}',
            Annotion: '//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}',
         },
         Satellite: {
            Map: '//t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}',
            Annotion: '//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}',
         },
         Terrain: {
            Map: '//t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}',
            Annotion: '//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}',
         },
         Inner: {
            Map: 'http://10.183.202.42:8219/tile?x={x}&y={y}&z={z}&type=WGS84',
         },
         Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
         key: '174705aebfe31b79b3587279e211cb9a',
      },

      GaoDe: {
         Normal: {
            Map: '//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
         },
         Satellite: {
            Map: '//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: '//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
         },
         Subdomains: ['1', '2', '3', '4'],
      },

      Google: {
         Normal: {
            Map: '//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
         },
         Satellite: {
            Map: '//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            Annotion: '//www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}',
         },
         Subdomains: [],
      },

      Geoq: {
         Normal: {
            Map: '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            PurplishBlue: '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
            Gray: '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
            Warm: '//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
         },
         Theme: {
            Hydro: '//thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}',
         },
         Subdomains: [],
      },

      OSM: {
         Normal: {
            Map: '//{s}.tile.osm.org/{z}/{x}/{y}.png',
         },
         Subdomains: ['a', 'b', 'c'],
      },

      Baidu: {
         Normal: {
            Map: '//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
         },

         Satellite: {
            Map: '//shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
            Annotion: '//online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020',
         },
         Subdomains: '0123456789',
         tms: true,
      },
   }
   L.tileLayer.chinaProvider = function(type, options) {
      return new L.TileLayer.ChinaProvider(type, options)
   }

   L.CoordConver = function() {
      function a(b, c) {
         var d = -100 + 2 * b + 3 * c + 0.2 * c * c + 0.1 * b * c + 0.2 * Math.sqrt(Math.abs(b)),
            d = d + (2 * (20 * Math.sin(6 * b * e) + 20 * Math.sin(2 * b * e))) / 3,
            d = d + (2 * (20 * Math.sin(c * e) + 40 * Math.sin((c / 3) * e))) / 3
         return (d += (2 * (160 * Math.sin((c / 12) * e) + 320 * Math.sin((c * e) / 30))) / 3)
      }
      function f(b, c) {
         var d = 300 + b + 2 * c + 0.1 * b * b + 0.1 * b * c + 0.1 * Math.sqrt(Math.abs(b)),
            d = d + (2 * (20 * Math.sin(6 * b * e) + 20 * Math.sin(2 * b * e))) / 3,
            d = d + (2 * (20 * Math.sin(b * e) + 40 * Math.sin((b / 3) * e))) / 3
         return (d += (2 * (150 * Math.sin((b / 12) * e) + 300 * Math.sin((b / 30) * e))) / 3)
      }
      this.getCorrdType = function(b) {
         var c = 'wgs84'
         switch (b.split('.')[0]) {
            case 'Geoq':
            case 'GaoDe':
            case 'Google':
               c = 'gcj02'
               break
            case 'Baidu':
               c = 'bd09'
               break
            case 'OSM':
            case 'TianDiTu':
               c = 'wgs84'
         }
         return c
      }
      this.bd09_To_gps84 = function(b, c) {
         var d = this.bd09_To_gcj02(b, c)
         return this.gcj02_To_gps84(d.lng, d.lat)
      }
      this.gps84_To_bd09 = function(b, c) {
         var d = this.gps84_To_gcj02(b, c)
         return this.gcj02_To_bd09(d.lng, d.lat)
      }
      this.gps84_To_gcj02 = function(b, c) {
         var d = a(b - 105, c - 35),
            k = f(b - 105, c - 35),
            l = (c / 180) * e,
            g = Math.sin(l),
            g = 1 - n * g * g,
            m = Math.sqrt(g),
            d = (180 * d) / (((h * (1 - n)) / (g * m)) * e),
            k = (180 * k) / ((h / m) * Math.cos(l) * e)
         return {
            lng: b + k,
            lat: c + d,
         }
      }
      this.gcj02_To_gps84 = function(b, c) {
         var d = a(b - 105, c - 35),
            k = f(b - 105, c - 35),
            l = (c / 180) * e,
            g = Math.sin(l),
            g = 1 - n * g * g,
            m = Math.sqrt(g),
            d = (180 * d) / (((h * (1 - n)) / (g * m)) * e),
            k = (180 * k) / ((h / m) * Math.cos(l) * e)
         return {
            lng: 2 * b - (b + k),
            lat: 2 * c - (c + d),
         }
      }
      this.gcj02_To_bd09 = function(b, c) {
         var d = Math.sqrt(b * b + c * c) + 2e-5 * Math.sin(c * p),
            a = Math.atan2(c, b) + 3e-6 * Math.cos(b * p)
         return {
            lng: d * Math.cos(a) + 0.0065,
            lat: d * Math.sin(a) + 0.006,
         }
      }
      this.bd09_To_gcj02 = function(b, c) {
         var d = b - 0.0065,
            a = c - 0.006,
            e = Math.sqrt(d * d + a * a) - 2e-5 * Math.sin(a * p),
            d = Math.atan2(a, d) - 3e-6 * Math.cos(d * p)
         return {
            lng: e * Math.cos(d),
            lat: e * Math.sin(d),
         }
      }
      var e = 3.141592653589793,
         h = 6378245,
         n = 0.006693421622965943,
         p = (3e3 * e) / 180
   }
   L.coordConver = function() {
      return new L.CoordConver()
   }
   L.TileLayer.ChinaProvider.include({
      addTo: function(a) {
         a.options.corrdType || (a.options.corrdType = this.options.corrdType)
         a.addLayer(this)
         return this
      },
   })
   L.tileLayer.chinaProvider = function(a, f) {
      f = f || {}
      f.corrdType = L.coordConver().getCorrdType(a)
      return new L.TileLayer.ChinaProvider(a, f)
   }
   L.GridLayer.include({
      _setZoomTransform: function(a, f, e) {
         var h = f
         void 0 != h &&
            this.options &&
            ('gcj02' == this.options.corrdType
               ? (h = L.coordConver().gps84_To_gcj02(f.lng, f.lat))
               : 'bd09' == this.options.corrdType && (h = L.coordConver().gps84_To_bd09(f.lng, f.lat)))
         f = this._map.getZoomScale(e, a.zoom)
         e = a.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(h, e)).round()
         L.Browser.any3d ? L.DomUtil.setTransform(a.el, e, f) : L.DomUtil.setPosition(a.el, e)
      },
      _getTiledPixelBounds: function(a) {
         var f = a
         void 0 != f &&
            this.options &&
            ('gcj02' == this.options.corrdType
               ? (f = L.coordConver().gps84_To_gcj02(a.lng, a.lat))
               : 'bd09' == this.options.corrdType && (f = L.coordConver().gps84_To_bd09(a.lng, a.lat)))
         a = this._map
         var e = a._animatingZoom ? Math.max(a._animateToZoom, a.getZoom()) : a.getZoom(),
            e = a.getZoomScale(e, this._tileZoom),
            f = a.project(f, this._tileZoom).floor()
         a = a.getSize().divideBy(2 * e)
         return new L.Bounds(f.subtract(a), f.add(a))
      },
   })
}

export { pointCorrection }
