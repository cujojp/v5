/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * A scroll monitor component which will attach scroll monitors 
 * to a specified element.
 *
 */

(function( $, app ) {

    var component = {
    init: function(element, context) {
      for (var i = 0; i < element.length; i++) {
        var el = element.jquery ?
          element.get(i) :
          element;

        new ScrollMonitor(el, context);
      }
    }
  };   

  /**
   * ScrollMonitor base constructor
   *
   * @param {jQuery|?Element} element 
   * @param {Object} context
   *
   * @constructor
   */
  var ScrollMonitor = function(element, context) {
    ScrollMonitor.base(this, 'constructor', element);

    /**
     * Base element for the module 
     *
     * @type {jQuery|element}
     * @private
     */
    this._element = element;

    /**
     * Element watcher using the scroll monitor plugins.
     *
     * @type {object}
     * @private
     */
    this._scrollWatcher = null;

    /**
     * Application base context, usually will be the main
     * application or parent module.
     *
     * @type {object}
     * @private
     */
    this._appContext = context;

    /**
     * App elements inner wrap and container.
     *
     * @type {jQuery|element}
     * @private
     */
    this._appWrap = null;


    /**
     * Boolean to determine if the element is in view or not
     * and to not fire thousands of events per scroll. :)
     *
     * @type {boolean}
     * @private
     */
    this._inView = false;


    this._handleErrors();
    this._init();
  };
  app._Utilities.inherits(ScrollMonitor, app._BaseComponent);


  /**
   * _handleErrors
   * Simple helper method to check for elements and or 
   * application context.
   *
   * @return
   */
  ScrollMonitor.prototype._handleErrors = function() {
    if (!this._element.nodeType) {
      throw new Error('No element found to attach scroll handlers.');
    }

    if (!this._appContext) {
      throw new Error('No context for scroll listeners.');
    }
  };

  /**
   * _init
   * Will create the bindings and event delegation for the scroll
   * monitor plugin
   *
   * @return
   */
  ScrollMonitor.prototype._init = function() {
    var $el = $(this._element);

    this._scrollWatcher = scrollMonitor.create(
      this._element,
      {top: (-this._appContext.window.height()+50)});

    this._appWrap = this.findByClass(
      app._Utilities.ClassName.APP_WRAP,
      this._app);  

    this._initializeBindings();
  };


  /**
   * _initializeBindings
   *
   * @private
   */
  ScrollMonitor.prototype._initializeBindings = function(el) {
    this._scrollWatcher.enterViewport(
      $.proxy(this._handleViewportEnter, this));

    this._scrollWatcher.exitViewport(
      $.proxy(this._handleViewportExit, this));
  };


  /**
   * _handleViewportExit
   *
   * Will handle events and trigger events for when the element
   * has exited the viewport.
   *
   * @private
   */
  ScrollMonitor.prototype._handleViewportExit = function() {
    
    if (!this._inView) { 
      return;
    }

    this._appWrap.trigger(
      app._Utilities.Events.VIEWPORT_EXIT,
      this._scrollWatcher);

    this._inView = false;
  };


  /**
   * _handleViewportEnter
   *
   * Will handle events and trigger events for when the element
   * has entered the viewport.
   *
   * @private
   */
  ScrollMonitor.prototype._handleViewportEnter = function() {
    if (this._inView) {
      return;
    }
    
    this._appWrap.trigger(
      app._Utilities.Events.VIEWPORT_ENTER,
      this._scrollWatcher);

    this._inView = true;
  };

  app._Components.ScrollMonitor = component;

})(jQuery, cujojp);

