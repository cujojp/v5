/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *
 * Utilities 
 * - - - - - -
 * Utility helper methods to further extend modules which maybe used
 * within any script on the application.
 */

(function($, app) {

  var Utilities = {

    inherits: function(child, parent) {
      child.prototype = Object.create(parent.prototype);
      child.prototype.constructor = child;

      child.base = function(self, methodName) {
        var args = Array.prototype.slice.call(arguments, 2);
        return parent.prototype[methodName].apply(self, args);
      };
    },

    /**
     * Returns a normalized transition end event name.
     * @return {string}
     */
    getTransitionEndEvent: function() {
      var transition;
      var el = document.createElement('fakeelement');
      var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
      };
      for(transition in transitions){
        if( el.style[transition] !== undefined ){
          return transitions[transition];
        }
      }
    },

    /**
     * Test for if an item is undefined or null.
     *
     * @param {*} value defined value to test against.
     */
    checkDefined: function(value) {
      return value !== undefined && value !== null;
    },

    /**
     * Test for if an item is undefined or null.
     *
     * @param {*} obj The input to test.
     * @param {*} defaultVal The fallback if the input is undefined.
     * @param {boolean} opt_test If defined, `test` will be used to determine which
     * @return {*} either default or an object.
     *
     */
    defaults: function(obj, defaultVal, opt_test) {
      var test = opt_test === undefined ?
        (obj === undefined || obj === null) : 
        !opt_test;

      // returns the clean object or value.
      return test ? defaultVal : obj;
    },


    /**
     * isOwnEvent
     *
     * Checks if the event target is the same event from itself
     * this often happens with transiton end and animation end
     * fns which are called on the same element.
     *
     * @param {object} event event handler.
     */
    isOwnEvent: function(event) {
      return event.target === event.currentTarget;
    },


    /**
     * isSameTransition
     *
     * Handler for when events maybe the same transition property.
     * Events may bubble on the same element causing duplicate 
     * transition end events.
     *
     * @param {object} event event handler.
     * @param {string} prop transition event property.
     */
    isSameTransition: function(event, prop) {
      return event.fake || !Utilities.checkDefined(prop) || event.originalEvent.propertyName === prop;
    },


    /**
     * makeFakeEvent
     *
     * @param element
     */
    makeFakeEvent: function(element) {

    },

    /**
     * onTransitionEnd
     *
     * @param element
     */
    onTransitionEnd: function(element, fn, context) {
      var callback = $.proxy(fn, Utilities.defaults(context, window));

      var transitionComplete = function(event) {
        if (Utilities.HAS_TRANSITIONS) {
          $(event.currentTarget).off(
              Utilities.getTransitionEndEvent(), 
              transitionComplete);
        }

        callback(event);
      };

      if (Utilities.HAS_TRANSITIONS) {

        $(element).on(Utilities.getTransitionEndEvent(), transitionComplete);
      } else {
        // Push to the end of the queue with a fake event which will pass the checks
        // inside the callback function.
        setTimeout(function() {
          transitionComplete(Utilities._makeFakeEvent(elem));
        }, 0);
      }
    },


    /**
     * Fade in an element and optionally add a class which sets visibility
     * to hidden.
     *
     * @param {jQuery|Element} el Element to fade.
     * @param {Function} opt_fn Callback function when faded out.
     * @param {Object} opt_this Context for the callback.
     * @param {boolean} opt_invisible Whether to add visibility:hidden to the
     *     element once it has faded out. Defaults to false.
     */
    fadeOutElement: function(el, opt_fn, opt_this, opt_invisible) {
      this.fadeElement(el, opt_fn, opt_this, opt_invisible, true);
    },


    /**
     * Fade in an element and optionally remove a class which sets visibility
     * to hidden.
     *
     * @param {Element} el Element to fade.
     * @param {Function=} opt_fn Callback function when faded out.
     * @param {Object=} opt_this Context for the callback.
     * @param {boolean=} opt_invisible Whether to add visibility:hidden to the
     *     element once it has faded out. Defaults to false.
     */
    fadeInElement: function(el, opt_fn, opt_this, opt_invisible) {
      this.fadeElement(el, opt_fn, opt_this, opt_invisible, false);
    },


    /**
     * Fade out an element and then set visibilty hidden on it.
     * @param {Element} el Element to fade.
     * @param {Function=} opt_fn Callback function when faded out.
     * @param {Object=} opt_this Context for the callback.
     * @param {boolean=} opt_invisible Whether to add visibility:hidden to the
     *     element once it has faded out. Defaults to false.
     * @param {boolean=} opt_isOut Whether to fade out or in. Defaults to fade out.
     */
    fadeElement: function(el, opt_fn, opt_this, opt_invisible, opt_isOut) {
      // Handle jQuery collections, but only take the first element from it.
      if (el.jquery) {
        el = el[0];
      }

      // Bind the context to the callback here so that the context and function
      // references can be garbage collected and the only things left are `callback`
      // and `opt_invisible`.
      var fn = $.isFunction(opt_fn) ? opt_fn : $.noop;
      var callback = $.proxy(fn, opt_this || window);
      var isOut = !!opt_isOut;
      var fakeEvent = {
        target: el,
        currentTarget: el
      };

      // Make sure the transition will actually happen.
      // isIn and has `in` class or
      // isOut and has `fade`, but doesn't have `in` class.
      if ((!isOut && $(el).hasClass(Utilities.ClassName.IN)) ||
        (isOut && !$(el).hasClass(Utilities.ClassName.IN) && $(el).hasClass(Utilities.ClassName.FADE))) {
        // This is expected to be async.
        setTimeout(function() {
          callback(fakeEvent);
        }, 0);
        return;
      }

      /**
       * @param {$.Event|{target: Element, currentTarget: Element}}
       *     evt Event object.
       */
      function faded(evt) {
        var source = evt.currentTarget;
        // Some other element's transition event could have bubbled up to this.
        if (!source || source !== evt.target) {
          return;
        }

        // Element has faded out, add invisible class.
        if (isOut && opt_invisible) {
          $(source).addClass(Utilities.ClassName.INVISIBLE);
        }

        // Done!
        callback(evt);
      }

      // Fading in, remove invisible class.
      if (!isOut && opt_invisible) {
        $(el).removeClass(Utilities.ClassName.INVISIBLE);
      }

      // Make sure it has the "fade" class. It won't do anything if it already does.
      $(el).addClass(Utilities.ClassName.FADE);

      // Remove (or add) the "in" class which triggers the transition.
      // If the element had neither of these classes, adding the "fade" class
      // will trigger the transition.
      $(el).toggleClass(Utilities.ClassName.IN, !isOut);

      if (Modernizr.csstransitions) {
        // Push to the end of the queue with a fake event which will pass the checks
        // inside the callback function.
        setTimeout($.proxy(faded, window, fakeEvent), 0);
      }
    }
  };

  /** @enum {string} */
  Utilities.ClassName = {
    ACTIVE: 'active',
    HIDDEN: 'hidden',
    FADE: 'fade',
    IN: 'in',
    INVISIBLE: 'invisible',

    // Base elements
    APP: 'app',
    APP_WRAP: 'app-container-wrap',
    IMAGE: 'img-swap',
  };

  /**
   * Transition Support
   * @type {boolean}
   */
  Utilities.HAS_TRANSITIONS = Modernizr.csstransitions;

  /**
   * Animation Support
   * @type {boolean}
   */
  Utilities.HAS_CSS_ANIMATIONS = Modernizr.cssanimations;

  /**
   * Transform Support
   * @type {boolean}
   */
  Utilities.HAS_TRANSFORMS = Modernizr.csstransforms;

  /** @enum {string} */
  Utilities.Events = {
    // Mouse
    CLICK: 'click',

    // Misc
    RESIZE: 'resize',
    SCROLL: 'scroll'
  };

  app._Utilities = Utilities;

})(jQuery, cujojp);
