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
    }
  };

  app._Utilities = Utilities;

})(jQuery, Cujo);
