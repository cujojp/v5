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
  };   



  app._Modules.Header = module;

})(jQuery, cujojp);
