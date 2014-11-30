/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Controls the height and width of a video element
 * and keeps video elements aspect ratio based on
 * documents height. Also displays a fallback image
 * if inline video elements are not supported (ie mobile).
 */

(function( $, app ) {

  var module = {
    init: function() {
      var $module = $('.'+app._Modules.VideoElement.Enums.ClassName.BASE);

      $module.each(function() {
        new VideoElement(this);
      });
    }
  };


  /**
   * Header Constructor
   * @constructor
   */
  var VideoElement = function(options) {

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
  VideoElement.prototype._init = function() {


  };

  app._Modules.VideoElement = module;

})(jQuery, Cujo);

