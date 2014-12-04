//= include ./inline-carousel.js
//= include ./inline-carousel-enums.js

/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Instantiates new inlineCarousel class if need be. 
 * Based on if elements are found on the documennt.
 *
 */

(function( $, app ) {
  'use strict';

  var $module = $('.'+app._Modules.InlineCarousel.Enums.ClassName.BASE);

  // Initialize Modules that don't require additional configuration.
  if ($module.length) {
    app._Modules.InlineCarousel.init();
  }

})(jQuery, cujojp);
