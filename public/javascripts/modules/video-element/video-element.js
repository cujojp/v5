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
    this._element = $(element);

    /**
     * Background video element.
     *
     * @type {jQuery|element}
     * @private
     */
    this._videoElement = null;

    /**
     * Background video element container.
     *
     * @type {jQuery|element}
     * @private
     */
    this._videoContainer = null;

    /**
     * Arbitarty number which is our native aspect ratio.
     *
     * @const 
     * @type {number}
     * @private
     */
    this._nativeAspectRatio = 1.777777778;

    /**
     * Debounced resize function
     *
     * @type {Object}
     * @private
     */
    this._debouncedResize = $.debounce(
        500,
        $.proxy(this._updateAssetDimensions, this));

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

    this._videoContainer = this.findByClass(
        app._Modules.VideoElement.Enums.ClassName.VIDEO_CONTAINER,
        this._element);

    this._videoElement = this.findByClass(
        app._Modules.VideoElement.Enums.ClassName.VIDEO,
        this._element);
        
    this._updateAssetDimensions();

    this._initializeBindings();
  };


  /**
   * _initializeBindings
   * Will initialize all bindings for the module.
   *
   * @return
   */
  VideoElement.prototype._initializeBindings = function() {
    this.window.on('resize', this._debouncedResize);
  };


  /**
   * _updateAssetDimensions
   * Will run on debounced resize, and initialization. And will
   * update the video size and height based on the document size.
   *
   * @private
   */
  VideoElement.prototype._updateAssetDimensions = function() {
    var windowDimensions = {};
    var videoDimensions = {};
    var videoParentDimensions = {};
    var videoStyles = {};

    videoDimensions.height = this._videoElement.height();
    videoDimensions.width = this._videoElement.width();
    videoDimensions.aspect = (videoDimensions.width /
                              videoDimensions.height);

    videoParentDimensions.height = this._element.height();
    videoParentDimensions.width = this._element.width();
    videoParentDimensions.aspect = (videoParentDimensions.width /
                                    videoParentDimensions.height);

    this._videoElement.removeAttr('style');

    var videoProperties = {};
  
    if (videoDimensions.height <= videoParentDimensions.height && 
       videoDimensions.width >= videoParentDimensions.width) {

      var height = videoParentDimensions.height;
      var width = Math.floor(videoParentDimensions.height *
                             videoDimensions.aspect);

      videoStyles = {
        'width': width + 'px',
        'height': height + 'px',
        'margin-top': - (height / 2) + 'px',
        'margin-left' : - (width / 2) + 'px',
        'top': 50 + '%',
        'left': 50 + '%'
      };
    } else {

      videoStyles = {
        'margin-top': - (videoDimensions.height / 2) + 'px',
        'top': 50 + '%',
      };

    }

    this._resizeVideoAsset(videoStyles);
  };
  

  /**
   * _resizeVideoAsset
   * Will resize the video asset based on the new window height.
   *
   * @param {object} videoStyles Object of new video styles
   *
   * @private
   */
  VideoElement.prototype._resizeVideoAsset = function(videoStyles) {

    this._videoElement.css(videoStyles);


  };


  app._Modules.VideoElement = module;

})(jQuery, Cujo);

