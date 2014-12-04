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
     * Main page application, or content.
     *
     * @type {jQuery|element}
     * @private
     */
    this._app = null;

    /**
     * Header menu icon.
     *
     * @type {jQuery|element}
     * @private
     */
    this._menuIcon = null;

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


    this._init();
  };
  app._Utilities.inherits(Header, app._BaseComponent);

  /**
   * _init
   * Initializes the module
   *
   * @return
   */
  Header.prototype._init = function() {

    this._initializeBindings();
  };


  /**
   * _initializeBindings
   * Initializes all binings and event listeners for the
   * header module.
   *
   * @private
   */
  Header.prototype._initializeBindings = function() {



  };

  app._Modules.Header = module;

})(jQuery, cujojp);

