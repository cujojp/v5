/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Controls the header interaction and functionality
 */

(function( $, app ) {

  /**
   * Header Constructor
   * @constructor
   */
  var Header = function(options) {

    /**
     * Defaults Object
     * TODO (kaleb): should be public header enum.
     * @type {object}
     * @private
     */
    this._defaults = {};

    /**
     * Base options object.
     * @type {object}
     * @private
     */
    this._options = {};

    // Map optional configs if they exist
    options = this._options = options ?
          $.extend({}, this._defaults, options) :
          this._defaults;


    this._init();
  };

  /**
   * _init
   * Initializes the header
   *
   * @return
   */
  Header.prototype._init = function() {


  };

  app._Modules.Header = Header;

})(jQuery, Cujo);
