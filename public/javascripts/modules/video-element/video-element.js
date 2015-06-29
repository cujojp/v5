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
    var videoStyles;

    var videoDimensions = {
      'height': this._videoElement.height(),
      'width':  this._videoElement.width(),
      'aspect': this._calculateAspect(
        this._videoElement.width(),
        this._videoElement.height())
    };

    var videoParentDimensions = {
      'height': this._element.height(),
      'width': this._element.width(),
      'aspect': this._calculateAspect(
        this._element.height(),
        this._element.width())
    };

    this._videoElement.removeAttr('style');

    if (this._isAspect(videoDimensions, videoParentDimensions)) {
      var height = videoParentDimensions.height;
      var width = Math.floor(videoParentDimensions.height *
                             videoDimensions.aspect);

      videoStyles = this._createStyleObject(
        videoDimensions, height, width, true);

    } else {
      videoStyles = this._createStyleObject(
        videoDimensions, null, null, false);
    }

    this._resizeVideoAsset(videoStyles);
  };
  

  /**
   * _createStyleObject
   * Creates a style object for the video element.
   *
   * @param {Object} obj video dimensions object
   * @param {number} opt_height window height
   * @param {number} opt_width window width
   * @param {boolean} opt_isAspect window aspect is > video aspect
   * @private
   */
  VideoElement.prototype._createStyleObject = 
      function(obj, opt_height, opt_width, opt_isAspect) {

    var videoStyles = {
      'margin-top': - (obj.height / 2) + 'px',
      'top': 50 + '%',
    };

    if (opt_isAspect) {
      videoStyles = {
        'width': opt_width + 'px',
        'height': opt_height + 'px',
        'margin-top': - (opt_height / 2) + 'px',
        'margin-left' : - (opt_width / 2) + 'px',
        'top': 50 + '%',
        'left': 50 + '%'
      };
    }
      
    return videoStyles;
  };


  /**
   * _isAspect
   * Helper method to return if the video is taller
   * than the window, or if the video is wider
   * than the window.
   *
   * @param {Object} videoObj
   * @param {Object} videoParentObj
   *
   * @return {boolean}
   */
  VideoElement.prototype._isAspect = function(videoObj, videoParentObj) {
    return (videoObj.height <= videoParentObj.height && 
       videoObj.width >= videoParentObj.width);
  };


  /**
   * _calculateAspect
   * Returns an apsect ratio.
   *
   * @param {number} height height of element
   * @param {number} width width of element
   *
   * @return {number}
   */
  VideoElement.prototype._calculateAspect = function(height, width) {
    return (width / height);
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

})(jQuery, cujojp);

