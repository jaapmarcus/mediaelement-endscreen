<?php
/*
Plugin Name: MediaElement.js Endscreen 
Plugin URI: https://mediaelementjs.com/
Description: 
Author:  Jaap Marcus
Version: 0.0.0
Author URI: https://eris.nu
Text Domain: media-element-endscreen
Domain Path: /languages/
License: MIT
*/		

    add_action( 'wp_ajax_getvideos', 'getvideos');
    add_action( 'wp_ajax_nopriv_getvideos', 'getvideos');
    add_action( 'wp_enqueue_scripts', 'get_videos_enqueue_scripts' );


function getvideos(){
    $post_array = array();
    $args = array( 'posts_per_page' => 3,  'category__not_in' => $nswf_category);
    $post_query = new WP_Query($args);
    if($post_query->have_posts() ) {
        while($post_query->have_posts() ) {
            $post_query->the_post();	
            $post = array();
            $post['title'] = get_the_title();
            $post['permalink'] = get_the_permalink();
            $post['image'] = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail_large');
            $post_array[] = $post;
        }
    }
    echo json_encode(array('title' => 'Laatste videos', 'videos' => $post_array));
    wp_die();
}

function get_videos_enqueue_scripts() {
   wp_enqueue_script('get_videos', plugins_url("mejs-endscreen/mejsendscreen.js"), array(), MEJS_VERSION);
   wp_localize_script( 'get_videos', 'ajaxURL', array( 'ajax_url' => admin_url( 'admin-ajax.php' )));
}
