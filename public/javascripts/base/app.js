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

    /**
     * Number of carousels which have instantiated within the
     * app.
     *
     * @type {number}
     */
    this._carouselInstantiations = 0;
    

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
    var images = this.findByClass(
        app._Utilities.ClassName.IMAGE,
        this._app);
    var inlineCarousels = this.findByClass(
        app._Utilities.ClassName.CAROUSEL,
        this._app);

    // if we have carousels we must wait until the carousels have cloned
    // the slides before we attach image swap. Also should check the number 
    // of inline carousels before running this and checking if
    // its the last instance of carosuels triggering their on
    // init callback.
    if (inlineCarousels.length) {
      this.app.on(
        'InlineCarousel:initialized', 
        $.proxy(this._handleCarouselCallback, this, inlineCarousels));
    } else {
      this._initializeImageSwap(images);
    }
  };


  /**
   * _handleCarouselCallback
   * Will handle the callback when a carousel instiates. This
   * is to fix issues of image-swap needing to run after 
   * carousels have initialized due to the cloned
   * slide technique.
   *
   * @param {Array|jQuery} els
   * @private
   */
  Main.prototype._handleCarouselCallback = function(els) {
    this._carouselInstantiations++;
    var images = this.findByClass(
        app._Utilities.ClassName.IMAGE,
        this._app);

    if (els.length >= this._carouselInstantiations) {
      this._initializeImageSwap(images);
    }
  };


  /**
   * _initializeImageSwap
   * Will look for any instances of image swap elements 
   * on the application and initialize them. 
   *
   * @param {Array|jQuery} images
   * @private
   */
  Main.prototype._initializeImageSwap = function(images) {

    new this.imageSwap(this._app, {
      imageContainer: '.'+app._Utilities.ClassName.IMAGE, 
      breakpoints: [320,768,1024]
    });
  };


  app._Main = module.init();

})(jQuery, cujojp);
