import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      Ember.$(window).scroll(function() {
        if (Ember.$(".navbar").offset().top > 50) {
          Ember.$(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
          Ember.$(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
      });

      Ember.$('a.page-scroll').bind('click', function(event) {
        var anchor = Ember.$(this);
        Ember.$('html, body').stop().animate({
          scrollTop: Ember.$(anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      });

      Ember.$('.navbar-collapse ul li a').click(function() {
        Ember.$('.navbar-toggle:visible').click();
      });

      var fadeStart=100, fadeUntil=900, fading = Ember.$('#fading');

      Ember.$(window).bind('scroll', function(){
        handleTopFadingImage();
        handlehowItWorksSaturation();
      });

      function handleTopFadingImage() {
        Ember.$('#fading').show();
        var offset = Ember.$(document).scrollTop(), opacity=0;
        if( offset<=fadeStart ){
          opacity=0;
        }else if( offset<=fadeUntil ){
          opacity=0+(offset-100)/100;
        }
        fading.css('opacity', opacity);
      }

      function handlehowItWorksSaturation() {
        var saturation = 100,
            saturationPadding = 200,
            howItWorks = Ember.$('#how-it-works .how-it-works-section'),
            offset = Ember.$(document).scrollTop(),
            howItWorksTop = howItWorks.position().top - 300,
            howItWorksBottom = howItWorksTop + howItWorks.height(),
            saturationStart = howItWorksTop - saturationPadding,
            saturationEnd = howItWorksBottom + saturationPadding,
            saturationMiddle = howItWorksTop + (howItWorks.height() / 2),
            percentageOn;
        if( offset <= saturationStart ) {
          saturation = 0;
        } else if( offset <= saturationMiddle ) {
          percentageOn = ((offset - saturationStart) / (saturationMiddle - saturationStart)) * 100;
          saturation = 0 + percentageOn;
        } else if( offset <= saturationEnd ) {
          percentageOn = ((offset - saturationMiddle) / (saturationEnd - saturationMiddle)) * 100;
          saturation = 100 - percentageOn;
        } else {
          saturation = 0;
        }
        howItWorks.css('filter', 'saturate(' + saturation + '%)');
      }
    });
  }
});
