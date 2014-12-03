//= include ./test-module.js
//= include ./test-module-enums.js

/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Simple test module, so I can quickly scaffold other modules.
 *
 */

(function( $, app ) {
  'use strict';

  var $module = $('.'+app._Modules.TestModule.Enums.ClassName.BASE);

  // Initialize Modules that don't require additional configuration.
  if ($module.length) {
    app._Modules.TestModule.init();
  }

})(jQuery, Cujo);
