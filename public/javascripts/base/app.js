/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *
 * Application Notes:
 * - - - - - -
 * Main Class which fires all the global componentsand
 * global modules for the app.
 */

(function( $, app ) {
  var module = {
    init: function() {
      new Main(this);
    }
  };

  /**
   * Our LocationsApp Constructor
   * @constructor
   */
  var Main = function() {
    Main.base(this, 'constructor');
    
    /**
     * Window object
     * @type {jQuery|object}
     */
    this.window = $(window);

    /**
     * Base html jQuery object
     * @type {jQuery|object}
     */
    this.html = $('html');

    /**
     * Base body jQuery object
     * @type {jQuery|object}
     */
    this.body = $('body');

    /**
     * Main page application, or content.
     *
     * @type {jQuery|element}
     * @private
     */
    this._app = this._body;

    /**
     * Base imageswap CJS function.
     *
     * @type {function}
     */
    this.imageSwap = app._Modules.ImageSwap;


    // initialize the main application
    this._init();
  };
  app._Utilities.inherits(Main, app._BaseComponent);


  /**
   * _init
   * Initializes the app.
   *
   */
  Main.prototype._init = function() {

    // init the rsponsive images library
    this._initializeImageSwap();
  };


  /**
   * _initializeImageSwap
   * Will look for any instances of image swap elements 
   * on the application and initialize them. 
   *
   */
  Main.prototype._initializeImageSwap = function() {
    var images = this.findByClass(
        app._Utilities.ClassName.IMAGE,
        this._app);

    new this.imageSwap(this._app, {
      imageContainer: '.'+app._Utilities.ClassName.IMAGE, 
      breakpoints: [320,768,1024]
    });
  };


  app._Main = module.init();

})(jQuery, cujojp);
