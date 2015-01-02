/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 *    
 * Header module. This will display the main navigation.
 * Which will be a side drawer and move the body to the 
 * left of the document to reveal the navigation and 
 * navigation children.
 *
 */

(function( $, app ) {

  var module = {
    init: function() {
      var $module = $('.'+app._Modules.Header.Enums.ClassName.BASE);

      $module.each(function() {
        new Header(this);
      });
    }
  };

  /**
   * Header Constructor
   * @constructor
   */
  var Header = function(element) {
    Header.base(this, 'constructor', element);

    /**
     * Base element for the module 
     *
     * @type {jQuery|element}
     * @private
     */
    this._element = $(element);

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
     * App Wrap inner container.
     *
     * @type {jQuery|element}
     * @private
     */
    this._appContainer = null;

    /**
     * Application content block container.
     *
     * @type {jQuery|element}
     * @private
     */
    this._appBlock = null;

    /**
     * Header menu icon.
     *
     * @type {jQuery|element}
     * @private
     */
    this._menuToggle = null;

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

    /**
     * Boolean to determine if the header is 
     * going to be fixed or not.
     *
     * @type {boolean}
     * @private
     */
    this._isFixed = false;

    /**
     * Base Overlay module which the header instantiates
     *
     * @type {boolean}
     * @private
     */
    this._overlay = null;

    /**
     * Main scroll monitor component.
     *
     * @type {boolean}
     * @private
     */
    this._scrollMonitor = app._Components.ScrollMonitor;

    /**
     * Base elements within the app view which
     * are going to trigger a header change.
     *
     * @type {jQuery|element}
     * @private
     */
    this._scrollWatchElements = null;

    /**
     * The last Y position after the header was
     * enabled.
     *
     * @type {Number}
     * @private
     */
    this._lastPositionY = 0;

    /**
     * The final scroll callback which is returned by the
     * scroll-monitor service.
     *
     * @type {object}
     * @private
     */
    this._lastScrollObject = {};

    /**
     * The final in viewport scroll event object which is returned by the
     * scroll-monitor service.
     *
     * @type {object}
     * @private
     */
    this._lastViewportScrollObject = {};


    this._init();
  };
  app._Utilities.inherits(Header, app._BaseComponent);


  /**
   * _init
   * Initializes the module
   *
   * @private
   */
  Header.prototype._init = function() {

    this._appWrap = this.findByClass(
        app._Utilities.ClassName.APP_WRAP,
        this._app);  

    this._appContainer = this.findByClass(
        app._Utilities.ClassName.APP_CONTAINER,
        this._app);  

    this._appBlock = this.findByClass(
        app._Utilities.ClassName.APP_CONTENT,
        this._app);

    this._menuToggle = this.findByClass(
        app._Modules.Header.Enums.ClassName.TOGGLE,
        this._element);  
    
    this._isFixed = this._element.hasClass('fixed');

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
  Header.prototype._initializeBindings = function() {
    // if were fixed we have to attach bindings for
    // scrolling and find our elements for the
    // viewport monitors.
    if (this._isFixed) {
      this._initializeFixedBindings();
    }

    this._appWrap.on(
        app._Utilities.Events.NAV_CLOSING,
        $.proxy(this._handleMenuClick, this));

    this._menuToggle.on(
        app._Utilities.Events.CLICK,
        $.proxy(this._handleMenuClick, this));
  };


  /**
   * _initializeFixedBindings
   * Event handlers for when the header is in a fixed position.
   *
   * @private
   */
  Header.prototype._initializeFixedBindings = function() {
    this._scrollWatchElements = this.findByClass(
      app._Utilities.ClassName.SCROLL_TARGET,
      this._appWrap);
    
    this._scrollMonitor.init(this._scrollWatchElements, this);

    this._appWrap.on(
      app._Utilities.Events.VIEWPORT_ENTER,
      $.proxy(this._handleViewportChange, this));

    this._appWrap.on(
      app._Utilities.Events.VIEWPORT_EXIT,
      $.proxy(this._handleViewportChange, this));
  };

  /**
   * _handleMenuClick
   *
   * Will handle event clicks on the menu icon.
   *
   * @param {object} event base event object
   * @private
   */
  Header.prototype._handleMenuClick = function(event) {
    var isOpen = !this._isOpen;

    // lock the scroll if the nav is open
    this._toggleScrollLock(isOpen);

    this._isOpen = isOpen;
  };


  /**
   * _toggleScrollLock
   *
   * Locks the scroll based on if the navigation is open
   * or not. Will set the app container's height to the
   * window height.
   *
   * @param {boolean} open boolean for if navigation 
   *    is toggled
   *
   * @private
   */
  Header.prototype._toggleScrollLock = function(open) {
    if (open) {
      //window.scrollTo(0, 0);
      this._startNavOpenSequence();
    } else {
      this._startNavCloseSequence();
    }
  };


  /**
   * _startNavOpenSequence
   * Will start the navigation menu open sequence. And 
   * attach bindings to requestAnimationFrame
   *
   * @private
   */
  Header.prototype._startNavOpenSequence = function() {
    this._lastPositionY = window.pageYOffset;

    var yPosition = (this._lastPositionY) * -1;

    this._body.removeClass(
        app._Modules.Header.Enums.ClassName.NAV_CLOSED);
    
    this._body.addClass([
        app._Modules.Header.Enums.ClassName.NAV_OPEN,
        app._Modules.Header.Enums.ClassName.NAV_OPENING,
      ].join(' '));

    this._createSlideElementStyles();
    this._createWrapStyles(yPosition);

    app._Utilities.onTransitionEnd(
      this._body,
      this._handleOpenFinished,
      this);
  };


  /**
   * _createSlideElementStyles
   * Will create styles for the sliding elements on the application.
   *
   * TODO: (kaleb) create a application-slider service which will
   * do all this work for us, instead of using the header class.
   * The header should only deal with header items. :)
   *
   * @private
   */
  Header.prototype._createSlideElementStyles = function() {
    var windowHeight = this._window.height();
    var slideStyles = {
      'height': windowHeight
    };

    this._body.css(slideStyles);
    this._appWrap.css(slideStyles);
    this._appContainer.css(slideStyles);
  };


  /**
   * _createWrapStyles
   * Will create animation styles for the wrap elements.
   *
   * TODO: (kaleb) same as _createSlideElementStyles, we
   * should have a service which does this outside of the
   * header.
   *
   * @param {Number} yPos the current window y position.
   *
   * @private
   */
  Header.prototype._createWrapStyles = function(yPos) {
    var wrapStyles = {
      '-webkit-transform': 'translateY('+ yPos + 'px )',
      '-ms-transform': 'translateY('+ yPos + 'px )',
      'transform': 'translateY('+ yPos + 'px )'
    };

    this._appBlock.css(wrapStyles);
  };


  /**
   * _handleOpenFinished
   * Handle when the navigation header is finished transition.
   *
   * @private
   */
  Header.prototype._handleOpenFinished = function() {
    this._body.removeClass(
      app._Modules.Header.Enums.ClassName.NAV_OPENING);

    this._appWrap.trigger(
      app._Utilities.Events.NAV_OPEN);
  };


  /**
   * _startNavCloseSequence
   * Will begin the close transition for the main navigation and
   * header.
   *
   * @private
   */
  Header.prototype._startNavCloseSequence = function() {
    this._body.removeClass(
        app._Modules.Header.Enums.ClassName.NAV_OPENING);
    
    this._body.addClass([
        app._Modules.Header.Enums.ClassName.NAV_CLOSING,
      ].join(' '));

    app._Utilities.onTransitionEnd(
      this._body,
      this._handleCloseFinished,
      this);
  };
    

  /**
   * _handleCloseFinished
   * Handle when the navigation header is finished this 
   * close transition.
   *
   * @private
   */
  Header.prototype._handleCloseFinished = function() {
    this._body.removeClass([
        app._Modules.Header.Enums.ClassName.NAV_CLOSING,
        app._Modules.Header.Enums.ClassName.NAV_OPEN,
    ].join(' '));

    this._body.addClass(
      app._Modules.Header.Enums.ClassName.NAV_CLOSED);

    this._body.removeAttr('style');
    this._appWrap.removeAttr('style');
    this._appContainer.removeAttr('style');
    this._appBlock.removeAttr('style');
    
    this._appWrap.trigger(
      app._Utilities.Events.NAV_CLOSED);

    window.scrollTo(0, this._lastPositionY);
  };   


  /**
   * _handleViewportChange
   * Will handle events being fired from the navigation if 
   * the header is fixed and must change themes.
   *
   * @param {object} event
   * @param {object} opt_scrollEvent
   * @private
   */
  Header.prototype._handleViewportChange = function(event, opt_scrollEvent) {
    if (!opt_scrollEvent) {
      return;
    }
    this._lastScrollObject = opt_scrollEvent;

    this._lastViewportScrollObject = opt_scrollEvent.isInViewport ?
        opt_scrollEvent :
        {};

    this._element.toggleClass('themed');
  };


  app._Modules.Header = module;

})(jQuery, cujojp);
