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

(function( $, app ) {

  /**
   * Our LocationsApp Constructor
   * @constructor
   */
  var BaseComponent = function() {
    
    /**
     * Window object
     * @type {jQuery|object}
     */
    this.window = $(window);

    /**
     * Base html jQuery object
     * @type {jQuery|object}
     */
    this.html = null;

    /**
     * Base body jQuery object
     * @type {jQuery|object}
     */
    this.body = null;

    /* override */
    this._Header = null;

    // initialize our application base.
    this._init();
  };
  

  /**
   * init
   *
   * Runs a lot of jquery selections and initializes our base class.
   */
  BaseComponent.prototype._init = function() {
    /**
     * Initialize main Header component
     * @override
     */
    app._Header = new app._Modules.Header();

  };

  app._BaseComponent = new BaseComponent();

})(jQuery, Cujo);

