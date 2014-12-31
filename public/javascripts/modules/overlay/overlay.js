/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 *    
 * The ovelray component will listen to events on when to create
 * and destroy an overlay component which also has event 
 * delegation to trigger the header module.
 *
 */

(function( $, app ) {

  var module = {
    init: function() {
      new Overlay(this);
    }
  };

  /**
   * Overlay Constructor
   * @constructor
   */
  var Overlay = function() {
    Overlay.base(this, 'constructor');

    /**
     * Base body element.
     *
     * @type {jQuery|element}
     * @private
     */
    this._body = $(this.body);

    /**
     * Base window element.
     *
     * @type {jQuery|element}
     * @private
     */
    this._window = $(this.window);

    /**
     * Main page application, or content.
     *
     * @type {jQuery|element}
     * @private
     */
    this._app = this._body;

    /**
     * App elements inner wrap and container.
     *
     * @type {jQuery|element}
     * @private
     */
    this._appWrap = null;
    
    /**
     * Cached jquery element for the app overlay.
     * Will fade in when the nav is enabled.
     *
     * @type {jQuery|element}
     * @private
     */
    this._appOverlay = null;

    /**
     * Boolean to determine if the nav is enabled and 
     * open versus closed.
     *
     * @type {boolean}
     * @private
     */
    this._isOpen = false;

    /**
     * Boolean to determine if the page/module is 
     * currently animating.
     *
     * @type {boolean}
     * @private
     */
    this._isAnimating = false;

    this._init();
  };
  app._Utilities.inherits(Overlay, app._BaseComponent);


  /**
   * _init
   * Initializes the module
   *
   * @private
   */
  Overlay.prototype._init = function() {

    this._appWrap = this.findByClass(
        app._Utilities.ClassName.APP_WRAP,
        this._app);  

    this._appOverlay = $('<div>');

    this._appOverlay.addClass([
      app._Utilities.ClassName.FADE,
      app._Modules.Overlay.Enums.ClassName.BASE
    ].join(' '));

    this._initializeBindings();
  };


  /**
   * _initializeBindings
   *
   * Initializes all binings and event listeners for the
   * header module.
   *
   * @private
   */
  Overlay.prototype._initializeBindings = function() {

    this._appWrap.on(
      app._Utilities.Events.NAV_OPEN,
      $.proxy(this._handleMenuOpen, this));

    this._appWrap.on(
      app._Utilities.Events.NAV_CLOSED,
      $.proxy(this._handleMenuClosed, this));
  };


  /**
   * _handleMenuClick
   *
   * Will handle event for which the nav is open
   *
   * @param {object} event base event object
   * @private
   */
  Overlay.prototype._handleMenuOpen = function(event) {
    var isOpen = !this._isOpen;

    this._appendOverlay();
    this._startOverlayOpenSequence();

    this._isOpen = isOpen;
  };
    
  /**
   * _handleMenuClosed
   *
   * Handle events for when the nav is closed.
   *
   * @param {object} event base event object
   * @private
   */
  Overlay.prototype._handleMenuClosed = function() {

    this._startOverlayCloseSequence();

  };


  /**
   * _handleOverlayClick
   * Will trigger an event to dismiss the header.
   *
   * @private
   */
  Overlay.prototype._handleOverlayClick = function() {

    this._appWrap.trigger(
      app._Utilities.Events.NAV_CLOSING);

  };


  /**
   * _appendOverlay
   * append the overlay to the application inner wrap
   *
   * @return
   */
  Overlay.prototype._appendOverlay = function() {
    this._appWrap.append(this._appOverlay);

    this._appOverlay.on(
      app._Utilities.Events.CLICK,
      $.proxy(this._handleOverlayClick, this));
  };


  /**
   * _startOverlayOpenSequence
   *
   * @private
   */
  Overlay.prototype._startOverlayOpenSequence = function() {
    var windowHeight = this._appWrap.height();
    var styles = {
      height: windowHeight
    };

    this._appOverlay.removeClass(
      app._Utilities.ClassName.OUT);

    app._Utilities.onTransitionEnd(
      this._appOverlay,
      this._handleOpenFinished,
      this);

    this._appOverlay.addClass(
      app._Utilities.ClassName.IN);
  };


  /**
   * _startOverlayCloseSequence
   * Starts transitions for removing the main overlay module.
   *
   * @private
   */
  Overlay.prototype._startOverlayCloseSequence = function() {
    app._Utilities.onTransitionEnd(
      this._appOverlay,
      this._handleCloseFinished,
      this);

    this._appOverlay.removeClass(
      app._Utilities.ClassName.IN);
  };


  /**
   * _handleOpenFinished
   * Handle when the navigation header is finished transition.
   *
   * @private
   */
  Overlay.prototype._handleOpenFinished = function() {
    console.log('fade in');
  };
    

  /**
   * _handleCloseFinished
   *
   * @private
   */
  Overlay.prototype._handleCloseFinished = function() {
    this._appOverlay.remove();

    this._appOverlay.off(
      app._Utilities.Events.CLICK);
  };   



  app._Modules.Overlay = module;

})(jQuery, cujojp);
