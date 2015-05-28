import Ember from 'ember';
/* global ol */

export default Ember.Component.extend({
  didInsertElement: function(){
    Ember.run.once(this, function(){
      var layerStyle = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: 'rgba(255, 0, 0, 0.4)'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(255, 204, 0, 0.2)',
            width: 1
          })
        })
      });

      var markerSource = new ol.source.Vector();

      this.get('facts').slice(0, 8).forEach(function(fact){
        try{
          markerSource.addFeature(new ol.Feature({
            geometry: new ol.geom.Point([fact.get('lng'), fact.get('lat')]).transform('EPSG:4326', 'EPSG:3857')
          }));
        } catch(e) {
          console.log('dangit, had an error at this [lat, long]:');
          console.log([fact.get('lat'), fact.get('lng')]);
        }
      });

      var vector = new ol.layer.Vector({
        source: markerSource,
        style: layerStyle
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
