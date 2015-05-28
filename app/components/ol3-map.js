import Ember from 'ember';
/* global ol */

export default Ember.Component.extend({
  vector: undefined,
  map: null,
  mapSetter: function(){
    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'sat'})
        }),
        this.vector
      ],
      target: 'map',
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });
  },
  layerStyle: function(){
    return new ol.style.Style({
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
  },
  addPoints: function(facts){
    var markerSource = new ol.source.Vector();

    facts.slice(0, 8).forEach(function(fact){
      try{
        markerSource.addFeature(new ol.Feature({
          geometry: new ol.geom.Point([fact.get('lng'), fact.get('lat')]).transform('EPSG:4326', 'EPSG:3857')
        }));
      } catch(e) {
        console.log('dangit, had an error at this [lat, long]:');
        console.log([fact.get('lat'), fact.get('lng')]);
      }
    });

    this.set('vector', new ol.layer.Vector({
      source: markerSource,
      style: this.layerStyle()
    }));

  },
  updatePoints: Ember.observer('facts', function(){
    //This doesn't current;y update on search but we need to make it work.
    this.addPoints(this.get('facts', true));
    if(!!this.map){
      this.map.setTarget(null);
      this.set('map', null);
    }
    this.mapSetter();
  }),
  didInsertElement: function(){
    Ember.run.once(this, function(){
      this.addPoints(this.get('facts'));
      this.mapSetter();;
    });
  }
});
