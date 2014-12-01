/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Instantiates an inline carousel on a page. Uses the slick 
 * carousel.
 */

(function( $, app ) {

  var module = {
    init: function() {
      var $module = $('.'+app._Modules.InlineCarousel.Enums.ClassName.BASE);

      $module.each(function() {
        new InlineCarousel(this);
      });
    }
  };

  /**
   * Inline Carousel Constructor
   * @constructor
   */
  var InlineCarousel = function(element) {
    InlineCarousel.base(this, 'constructor', element);

    /**
     * Base element for the module 
     *
     * @type {jQuery|element}
     * @private
     */
    this._element = $(element);

    this._init();
  };
  app._Utilities.inherits(InlineCarousel, app._BaseComponent);

  /**
   * _init
   * Initializes the inline carousel element.
   *
   * @private 
   */
  InlineCarousel.prototype._init = function() {

    this._initializeCarousel();
  };


  /**
   * _initializeBindings
   * Will initialize all bindings for the module.
   *
   * @private 
   */
  InlineCarousel.prototype._initializeBindings = function() {

  };


  /**
   * _initializeCarousel
   *
   * Runs the slick plugin and initializes the carousel.
   *
   * @private
   */
  InlineCarousel.prototype._initializeCarousel = function() {

    this._element.slick();

  };


  app._Modules.InlineCarousel = module;

})(jQuery, Cujo);

