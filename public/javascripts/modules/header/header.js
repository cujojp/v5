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
    this._themedElements = null;



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
    //
    // NOTE: header with a media element in the background
    // should NEVER be fixed. This breaks our style guidelines.
    if (this._isFixed) {
      this._themedElements = this.findByClass(
        app._Utilities.ClassName.THEMED,
        this._appWrap)
        .filter('.'+app._Utilities.ClassName.THEME_CUJOJP);
      
      this._scrollMonitor.init(this._themedElements, this);

      this._appWrap.on(
        app._Utilities.Events.VIEWPORT_ENTER,
        $.proxy(this._handleViewportChange, this));

      this._appWrap.on(
        app._Utilities.Events.VIEWPORT_EXIT, function() {
        console.log('hmmm');
      });
    }

    this._appWrap.on(
        app._Utilities.Events.NAV_CLOSING,
        $.proxy(this._handleMenuClick, this));

    this._menuToggle.on(
        app._Utilities.Events.CLICK,
        $.proxy(this._handleMenuClick, this));
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
      window.scrollTo(0, 0);
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
    var windowHeight = this._window.height();
    var styles = {
      height: windowHeight
    };
     
    this._body.removeClass(
        app._Modules.Header.Enums.ClassName.NAV_CLOSED);
    
    this._body.addClass([
        app._Modules.Header.Enums.ClassName.NAV_OPEN,
        app._Modules.Header.Enums.ClassName.NAV_OPENING,
      ].join(' '));
                      
    this._body.css(styles);
    this._appWrap.css(styles);

    app._Utilities.onTransitionEnd(
      this._body,
      this._handleOpenFinished,
      this);
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

    this._appWrap.trigger(
      app._Utilities.Events.NAV_CLOSED);
  };   


  /**
   * _handleViewportChange
   * Will handle events being fired from the navigation if 
   * the header is fixed and must change themes.
   *
   * @param {object} event
   * @private
   */
  Header.prototype._handleViewportChange = function(event) {

    console.log('cool', event);

  };


  app._Modules.Header = module;

})(jQuery, cujojp);
