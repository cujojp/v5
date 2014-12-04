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
   *
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

    /**
     * carousel element for the module 
     *
     * @type {jQuery|element}
     * @private
     */
    this._carousel = null;

    /**
     * Base captions on the carousel element.
     *
     * @type {jQuery|element}
     * @private
     */
    this._captions = null;

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

    this._carousel = this.findByClass(
        app._Modules.InlineCarousel.Enums.ClassName.CAORUSEL,
        this._element);

    this._captions = this.findByClass(
        app._Modules.InlineCarousel.Enums.ClassName.CAPTION,
        this._element);

    this._initializeCarousel();
    this._setupCaptions();
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
   * _setupCaptions
   * Sets up first caption elements.
   *
   * @private
   */
  InlineCarousel.prototype._setupCaptions = function() {

    if (!this._captions) {
      return;
    }

    // fade in the first caption
    app._Utilities.fadeInElement(this._captions.eq(0), null, null, true);

  };


  /**
   * _initializeCarousel
   *
   * Runs the slick plugin and initializes the carousel.
   *
   * @private
   */
  InlineCarousel.prototype._initializeCarousel = function() {

    this._carousel.slick({
      onAfterChange: $.proxy(this._handleSlideComplete, this),
      dots: true,
      dotsClass: 'paging-container'
    });

    // start event listeners for the carousel.
    this._initializeBindings();
  };


  /**
   * _handleSlideComplete
   * Will handle event delegation for when a slide is complete
   * on the inline carosuel.
   *
   * @private
   */
  InlineCarousel.prototype._handleSlideComplete = function(event) {
    var currentSlide = event.currentSlide || 0;
    var i = 0;

    // fade out all the captions.
    for(; i < this._captions.length; i++) {
      app._Utilities.fadeOutElement(
          this._captions.eq(i),
          null,
          null,
          true);
    }

    // fade in only the current caption
    app._Utilities.fadeInElement(
        this._captions.eq(currentSlide),
        null,
        null,
        true);
  };

  app._Modules.InlineCarousel = module;

})(jQuery, cujojp);

