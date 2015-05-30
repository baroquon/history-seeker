import Ember from 'ember';
/* global ol */

export default Ember.Component.extend({
  classNames: ['map'],
  vector: undefined,
  map: null,
  mapSetter: function(){
    let element = this.get('element');
    let center = this.findCenter(this.get('facts'));
    let zoom = 3;
    if(this.get('facts').length === 1){
      zoom = 6;
    }
    let map = this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'sat'})
        }),
        this.vector
      ],
      target: element,
      view: new ol.View({
        center: ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'),
        zoom: zoom
      })
    });
    // change mouse cursor when over marker
    $(map.getViewport()).on('mousemove', function(e) {
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return true;
      });
      if (hit) {
        map.getTarget().style.cursor = 'pointer';
      } else {
        map.getTarget().style.cursor = '';
      }
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
        _this.sendAction('action', 'facts.show', firstFeature.get('fact'));
      }
    });
  },
  layerStyle: function(){
    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '/assets/images/marker.png'
      })
    });
  },
  addPoints: function(facts){
    let markerSource = new ol.source.Vector();

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
  },
  findCenter: function(facts){
    let latitudes = facts.map(function(fact){
      return fact.get('lat');
    });
    let longitudes = facts.map(function(fact){
      return fact.get('lng');
    });
    let maxLat = Math.max.apply(null, latitudes);
    let minLat = Math.min.apply(null, latitudes);
    let maxLng = Math.max.apply(null, longitudes);
    let minLng = Math.min.apply(null, longitudes);
    let centerLat = minLat + (0.5 * (maxLat - minLat));
    let centerLng = minLng + (0.5 * (maxLng - minLng));
    return [centerLng, centerLat];
  }
});
