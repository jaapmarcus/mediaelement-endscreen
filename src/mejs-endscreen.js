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
        if(this.readyState == 4 && this.status == 200){
            const data = JSON.parse(this.responseText);
            
            var txt = '<h3 class="mejs-end-h3">'+data.title+'</h3>';
            for(i = 0; i < data.videos.length; i++){
               var video =  data.videos[i];
               txt += '<div class="mejs-endscreen-video"><img src="'+ video.image +'" height="150px" width="200px" /><h4 class="mejs-endscreen-h4">'+video.title+'</h4></div>';
            };
            t.endScreen.innerHTML = txt;
        }
      };
      console.log(ajaxURL.ajax_url);
      xhttp.open("POST", ajaxURL.ajax_url, true);
      xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
      xhttp.send('action=getvideos');

   }
});