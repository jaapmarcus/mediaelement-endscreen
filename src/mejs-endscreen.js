'use strict';
/**
    IMA SDK plugin for MediaElement.js
    (c) Jaap Marcus
    License Dunno Yet
    
    Adds Ad support via VAST, VPAID JS AND VMAP to Media Elements 
    Incase you want to switch over to IMA remove. Ads, Ads Vpaid and Postroll plugins!
    See readme.md for information   
*/
Object.assign(mejs.MepDefaults, {

});

Object.assign(MediaElementPlayer.prototype, {

   buildendscreen : function ( player , controls, layers, media ) {
       var t = this;
       t.player = player;
       t.controls = controls;
       t.layers = layers;
       t.media = media;
       
       console.log(t);
       console.log(t.player.media);
       t.player.media.addEventListener('ended', t.showEndsceen.bind(t));
   },
            
   showEndsceen : function (){
       var t = this;
       t.endScreen = document.createElement('div');
       t.endScreen.classList.add('mejs-end-screen');
       t.endScreen.id = `${player.options.classPrefix}endscreen`;;
         
       t.layers.appendChild(this.endScreen);
       
       t.endScreen.classList.add('mejs__layer');
       t.endScreen.classList.add('mejs__overlay');   

       t.endScreen.innerHTML="<div class=\"mejs-endscreen-video\" id=\"mejs-endscreen-related-video\"></div><h3 class=\"mejs-endscreen-h3\">Deel video</h3>";
       t.endScreen.innerHTML+="<ul class=\"mejs-endscreen-ul\"><li class=\"mejs-endscreen-whatsapp\"><a href=\"https://api.whatsapp.com/send?text="+ encodeURIComponent(window.location+'?utm_source=share') +"\"><i class=\"fab fa-whatsapp\"></i> Share Video<a></li><li class=\"mejs-endscreen-facebook\"><a href=\"http://www.facebook.com/sharer.php?u="+ encodeURIComponent(window.location+'?utm_source=share') +"\"><i class=\"fab fa-facebook\"></i> Deel Video<a></li><li class=\"mejs-endscreen-twitter\"><a href=\"https://twitter.com/share?text="+document.title+"&url="+ encodeURIComponent(window.location+'?utm_source=share') +"\"><i class=\"fab fa-twitter\"></i> Deel Video<a></li></ul>";
       t.player.media.addEventListener('playing', t.hideEndscreen.bind(t));

   },
   
   hideEndscreen : function (){
       var t = this;
       console.log(this.endScreen);
       t.layers.removeChild(this.endScreen)
   }
   
});