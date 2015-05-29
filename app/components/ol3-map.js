import Ember from 'ember';
/* global ol */

export default Ember.Component.extend({
  vector: undefined,
  map: null,
  mapSetter: function(){
    let element = this.get('element');
    let map = this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'sat'})
        }),
        this.vector
      ],
      target: element,
      view: new ol.View({
        center: [0, 0],
        zoom: 2
      })
    });
    let vector = this.get('vector');
    let _this = this;
    map.on('click', function(e){
      let features = [];
      map.forEachFeatureAtPixel(
        e.pixel,
        function(feature, layer){
          features.push(feature);
        },
        null,
        function(layer){
          return layer == vector;
        }
      );
      let firstFeature = features[0];
      if(firstFeature){
        console.log(firstFeature);
        _this.sendAction('action', 'facts.show', firstFeature.get('fact'));
      }
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

    facts.forEach(function(fact){
      try{
        markerSource.addFeature(new ol.Feature({
          geometry: new ol.geom.Point([fact.get('lng'), fact.get('lat')]).transform('EPSG:4326', 'EPSG:3857'),
          fact: fact
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
    this.addPoints(this.get('facts'));
    // Probably shouldn't have to destroy the whole map and recreate it to make it work
    // update on search but that is what is happening here.
    if(!!this.map){
      this.map.setTarget(null);
      this.set('map', null);
    }
    this.mapSetter();
  }),
  didInsertElement: function(){
    Ember.run.once(this, function(){
      let facts = this.get('facts');
      if(!!facts){
        this.addPoints(facts);
        this.mapSetter();
      }
    });
  }
});
