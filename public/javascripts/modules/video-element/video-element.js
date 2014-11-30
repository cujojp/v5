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
  var VideoElement = function(element) {
    VideoElement.base(this, 'constructor', element);

    /**
     * Base element for the module 
     *
     * @type {jQuery|element}
     * @private
     */
    this._elment = element;


    this._init();
  };
  app._Utilities.inherits(VideoElement, app._BaseComponent);

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

