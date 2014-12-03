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

  };


  app._Modules.Header = module;

})(jQuery, Cujo);

