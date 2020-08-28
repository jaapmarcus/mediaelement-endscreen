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
       t.player.media.addEventListener('ended', t.showVideos.bind(t));
   },
            
   showVideos : function (){
       var t = this;
       t.endScreen = document.createElement('div');
       t.endScreen.classList.add('mejs-end-screen');
       t.endScreen.id = `${player.options.classPrefix}endscreen`;;
         
       t.layers.appendChild(this.endScreen);
       
        t.endScreen.classList.add('mejs__layer');
        t.endScreen.classList.add('mejs__overlay');   

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        console.log(this);
        console.log(t);
         t.endScreen.innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "./endscreen.txt", true);
      xhttp.send();

   }
});