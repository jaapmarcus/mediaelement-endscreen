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

       if (document.getElementById("endscreen-data")) {
          console.log(window.innerWidth);
          console.log(window.innerHeight);
          t.endScreen.innerHTML =
            document.getElementById("endscreen-data").innerHTML;
        }
       t.player.media.addEventListener('playing', t.hideEndscreen.bind(t));

   },
   
   hideEndscreen : function (){
       var t = this;
       console.log(this.endScreen);
       t.layers.removeChild(this.endScreen)
   }
   
});