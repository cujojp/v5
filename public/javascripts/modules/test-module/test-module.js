/**
 * @fileoverview
 * @author Kaleb White (cujojp)
 *    
 * Simple test module, so I can quickly scaffold other modules.
 *
 */

(function( $, app ) {

  var module = {
    init: function() {
      var $module = $('.'+app._Modules.TestModule.Enums.ClassName.BASE);

      $module.each(function() {
        new TestModule(this);
      });
    }
  };

  /**
   * Header Constructor
   * @constructor
   */
  var TestModule = function(element) {
    TestModule.base(this, 'constructor', element);

    /**
     * Base element for the module 
     *
     * @type {jQuery|element}
     * @private
     */
    this._element = $(element);


    this._init();
  };
  app._Utilities.inherits(TestModule, app._BaseComponent);

  /**
   * _init
   * Initializes the module
   *
   * @return
   */
  TestModule.prototype._init = function() {

  };


  app._Modules.TestModule = module;

})(jQuery, Cujo);

