//= include ./video-element.js
//= include ./video-element-enums.js

/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Instantiates new videoElement class if need be. 
 * Based on if elements are found on the documennt.
 *
 */

(function( $, app ) {
  'use strict';

  var $module = $('.'+app._Modules.VideoElement.Enums.ClassName.BASE);

  // Initialize Modules that don't require additional configuration.
  if ($module.length) {
    app._Modules.VideoElement.init();
  }

})(jQuery, cujojp);
