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

      /**
       * Calls superclass constructor/method.
       *
       * This function is only available if you use goog.inherits to
       * express inheritance relationships between classes.
       *
       * NOTE: This is a replacement for goog.base and for superClass_
       * property defined in child.
       *
       * @param {!Object} me Should always be "this".
       * @param {string} methodName The method name to call. Calling
       *     superclass constructor can be done with the special string
       *     'constructor'.
       *     method/constructor.
       * @return {*} The return value of the superclass method/constructor.
       */
      child.base = function(me, methodName) {
        var args = Array.prototype.slice.call(arguments, 2);
        return parent.prototype[methodName].apply(me, args);
      };
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
    INVISIBLE: 'invisible'
  };

  app._Utilities = Utilities;

})(jQuery, cujojp);
