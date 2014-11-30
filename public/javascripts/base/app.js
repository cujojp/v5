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
  var Portfolio = function() {
    
    console.log(app);

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
  Portfolio.prototype._init = function() {
    /**
     * Initialize main Header component
     * @override
     */
    app._Header = new app._Modules.Header();

  };

  app.Portfolio = new Portfolio();

})(jQuery, Cujo);

