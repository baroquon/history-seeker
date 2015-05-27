import Ember from 'ember';
/* global ol */

export default Ember.Component.extend({
  didInsertElement: function(){
    Ember.run.once(this, function(){

      var styleCache = {};
      var styleFunction = function(feature, resolution) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it from
        // the Placemark's name instead.
        var name = feature.get('name');
        var magnitude = parseFloat(name.substr(2));
        var radius = 5 + 20 * (magnitude - 5);
        var style = styleCache[radius];
        if (!style) {
          style = [new ol.style.Style({

            image: new ol.style.Circle({
              radius: radius,
              fill: new ol.style.Fill({
                color: 'rgba(255, 153, 0, 0.4)'
              }),
              stroke: new ol.style.Stroke({
                color: 'rgba(255, 204, 0, 0.2)',
                width: 1
              })
            })
          })];
          styleCache[radius] = style;
        }
        return style;
      };

      var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: '/assets/2012_Earthquakes_Mag5.kml',
          format: new ol.format.KML({
            extractStyles: false
          })
        }),
        style: styleFunction
      });

      var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          }),
          vector
        ],
        target: 'map',
        view: new ol.View({
          center: [0, 0],
          zoom: 2
        })
      });

    });
  }
});
