import Ember from 'ember';
/* global ol */
 /*jshint unused:false */
 /*jshint eqeqeq:false */

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
          //source: new ol.source.OSM()
          source: new ol.source.XYZ({
            url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmFyb3F1b24iLCJhIjoiY2l1Mm4xYnVhMGoyejJ1cXR6eGs3MnZkMSJ9.qM5pVGQz_wYawLaZyX3U5A'
          })
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
    Ember.$(map.getViewport()).on('mousemove', function(e) {
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
        console.log('We had an error at this [lat, long]:');
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
      let maximize = this.get('maximize') || false;
      if(!!facts){
        if(maximize){
          // make it take up the remaining height
          Ember.$(this.element).height(Ember.$(window).height() - Ember.$(this.element).offset()["top"]);
        }
        this.addPoints(facts);
        this.mapSetter();
      }
    });
  },
  willDestroyElement: function(){
    if ( !(this.get('isDestroyed') || this.get('isDestroying')) ) {
      this.map.setTarget(null);
      this.set('map', null);
    }
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
