//= include core.js
//= include ../libs/jQuery-2.1.0.min.js
//= include_tree ../components/

/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *
 * Application Notes:
 * - - - - - -
 * We will be attaching many module classes to the
 * window.Cujo namespace.
 * All modules will exist adjacent to the Core module
 * that exists on all site pages.
 */


;(function( $, app ) {

  /**
   * Initialize main Header component
   * @override
   */
  app._Header = new app._Modules.Header();

})(jQuery, Cujo);
