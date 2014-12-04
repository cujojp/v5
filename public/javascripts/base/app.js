/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *
 * Application Notes:
 * - - - - - -
 * We will be attaching many module classes to the
 * window.Cujo namespace.
 * All modules will exist adjacent to the Core module
 * that exists on all site pages.
 */

(function( $, app ) {

  /**
   * Our LocationsApp Constructor
   * @constructor
   */
  var BaseComponent = function() {
    
    /**
     * Window object
     * @type {jQuery|object}
     */
    this.window = $(window);

    /**
     * Base html jQuery object
     * @type {jQuery|object}
     */
    this.html = $('html');

    /**
     * Base body jQuery object
     * @type {jQuery|object}
     */
    this.body = $('body');
  };
  

  /**
   * Shortcut for jquery.closest();
   * @param {jQuert|Element} el Id of the element.
   * @param {string} string Id of the element.
   *
   * @return {?Element} The element, or null if not found.
   */
  BaseComponent.prototype.getClosest = function( el, string ) {
    return el.closest( '.' + string );
  };


  /**
   * Finds the cloesest element within this class' main element.
   * @param {string} element 
   * @param {jQuery|Element} [context] Optionally provide the context (scope)
   *     for the query. Default is the main element of the class.
   *
   * @return {?jQuery|Element} 
   */
  BaseComponent.prototype.findByElementName = function( className, context ) {
    return $(className, context || this.$el );
  };


  /**
   * Finds an element within this class' main element.
   * @param {string} className Class name to search for.
   * @param {jQuery|Element} [context] Optionally provide the context (scope)
   *     for the query. Default is the main element of the class.
   * @return {jQuery} A jQuery object which may or may not contain the element
   *     which was searched for.
   */
  BaseComponent.prototype.findByClass = function( className, context ) {
    return $( '.' + className, context || this.$el );
  };

  app._BaseComponent = BaseComponent;

})(jQuery, cujojp);
