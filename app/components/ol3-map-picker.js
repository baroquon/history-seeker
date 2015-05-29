import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['map'],
  vector: undefined,
  map: null,
  mapSetter: function(){
    let element = this.get('element');
    let zoom = 3;
    let markerSource = new ol.source.Vector();
    this.set('vector', new ol.layer.Vector({
      source: markerSource,
      style: this.layerStyle()
    }));
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
        zoom: zoom
      })
    });
    let vector = this.get('vector');
    let _this = this;
    map.on('click', function(e){
      let point = map.getCoordinateFromPixel(e.pixel);
      markerSource.getFeatures().forEach(function(feature){
        console.log(feature);
        markerSource.removeFeature(feature);
      });
      markerSource.addFeature(new ol.Feature({
        geometry: new ol.geom.Point(point)
      }));
      _this.sendAction('action', ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326'));
    });
  },
  layerStyle: function(){
    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '/assets/images/icon.png'
      })
    });
  },
  didInsertElement: function(){
    Ember.run.once(this, function(){
      this.mapSetter();
    });
  }
});
