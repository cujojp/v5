//= include ./header.js
//= include ./header-enums.js

/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Header module. This will display the main navigation.
 * Which will be a side drawer and move the body to the 
 * left of the document to reveal the navigation and 
 * navigation children.
 *
 */

(function( $, app ) {
  'use strict';

  var $module = $('.'+app._Modules.Header.Enums.ClassName.BASE);

  // Initialize Modules that don't require additional configuration.
  if ($module.length) {
    app._Modules.Header.init();
  }

})(jQuery, Cujo);
