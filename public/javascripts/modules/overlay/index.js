//= include ./overlay.js
//= include ./overlay-enums.js

/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * The ovelray component will listen to events on when to create
 * and destroy an overlay component which also has event 
 * delegation to trigger the header module.
 *
 */

(function( $, app ) {
  'use strict';

  // Initialize Modules that don't require additional configuration.
  app._Modules.Overlay.init();

})(jQuery, cujojp);
