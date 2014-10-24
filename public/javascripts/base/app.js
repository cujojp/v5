/**
 * @author Kaleb White (cujojp)
 *
 * Creates a site wide namespace and application parameters and utilities
 * used throughout the Uber application.
 */

;(function( app ) {

/**
 * Our LocationsApp Constructor
 * @constructor
 */
  var LocationsApp = function() {

    /**
     * Window object
     * @type {jQuery|object}
     */
    this.window = $(window);

    /**
     * Base html jQuery object
     * @type {jQuery|object}
     */
    this.html = null;

    /**
     * Base body jQuery object
     * @type {jQuery|object}
     */
    this.body = null;

    /**
     * Handle postel codes passed into map.
     * @type {object}
     * @private
     */
    this._postalCodes = {};

    /**
     * Location data object.
     * @type {object}
     * @private
     */
    this._locationData = {};

    /**
     * Base app element.
     * @type {jQuery|object}
     */
    this.appElement = null;    

    /**
     * Our base element for the application.
     * @type {jQuery|object}
     */
    this.element = null;

    /**
     * Google Geolocator, to get lat lng of addresses.
     */
    this.geolocate = null;

    /**
     * Gmaps library
     */
    this.gmaps = window.GMaps;

    // initialize our application base.
    this._init();
  };

  /** @enum {string} */
  UberLocations._Data.CLASSNAME = {
    APP: '.app',
    BASE: '.main',
    LOCATION_LIST: '.location-list',
    LISTING_WRAPPER: '.location-item',
    LISTING_MAP: '.location-listing-map',
    LIST_MAP_WRAP: '.map-container',
  
    // edit location form
    EDIT_CONTAINER: '.edit-location-container',
    EDIT_FIELD: '.edit-field',
    EDIT_NAME: '.edit-location-name',
    EDIT_ADDRESS: '.edit-location-address',
    EDIT_CITY: '.edit-location-city',
    EDIT_STATE: '.edit-location-state',
    EDIT_POSTAL: '.edit-location-postal',

    // location detail
    DETAIL_CONTAINER: '.location-details',
    DETAIL_MAP_WRAP: '.map-container',
    DETAIL_MAP: '.location-listing-map',

    // add location form
    ADD_LOCATION_WRAP: '.add-location-container',
    ADD_LOCATION_FIELD: '.add-field',
    ADD_LOCATION_MODAL: '.add-location-modal',

    MODAL_VIEW: '.modal-view',
    MODAL_OVERLAY: '.modal-overlay',

    // utilities
    ERROR: 'error',
    IN: 'in',
    OUT: 'out'
  };

  /** @enum {string} */
  UberLocations._Data.TEMPLATES = {
    MAIN: '/templates/main.html',
    LOCATION_LIST: '/templates/location-listing.html',
    NO_LOCATIONS: '/templates/location-listing-no-results.html',
    LOCATION_DETAIL: '/templates/location-detail.html',
    EDIT_LOCATION: '/templates/edit-location.html',
    ADD_LOCATION: '/templates/add-location.html'
  };

  /** @enum {string} */
  UberLocations._Data.API = {
    REMOVE_LOCATION: '/api/remove-location/',
    ADD_LOCATION: '/api/add-location/',
    EDIT_LOCATION: '/api/edit-location/',
    GET_LOCATIONS: '/api/get-locations/data.json',
    GET_LOCATIONS_DETAIL: '/api/get-location/:id/data.json'
  };

  /** @enum {array} */
  UberLocations._Data.STATES = [
    { name: 'Alabama', abbreviation: 'AL'},
    { name: 'Alaska', abbreviation: 'AK'},
    { name: 'American Samoa', abbreviation: 'AS'},
    { name: 'Arizona', abbreviation: 'AZ'},
    { name: 'Arkansas', abbreviation: 'AR'},
    { name: 'California', abbreviation: 'CA'},
    { name: 'Colorado', abbreviation: 'CO'},
    { name: 'Connecticut', abbreviation: 'CT'},
    { name: 'Delaware', abbreviation: 'DE'},
    { name: 'District of Columbia', abbreviation: 'DC'},
    { name: 'Florida', abbreviation: 'FL'},
    { name: 'Georgia', abbreviation: 'GA'},
    { name: 'Guam', abbreviation: 'GU'},
    { name: 'Hawaii', abbreviation: 'HI'},
    { name: 'Idaho', abbreviation: 'ID'},
    { name: 'Illinois', abbreviation: 'IL'},
    { name: 'Indiana', abbreviation: 'IN'},
    { name: 'Iowa', abbreviation: 'IA'},
    { name: 'Kansas', abbreviation: 'KS'},
    { name: 'Kentucky', abbreviation: 'KY'},
    { name: 'Louisiana', abbreviation: 'LA'},
    { name: 'Maine', abbreviation: 'ME'},
    { name: 'Maryland', abbreviation: 'MD'},
    { name: 'Massachusetts', abbreviation: 'MA'},
    { name: 'Michigan', abbreviation: 'MI'},
    { name: 'Minnesota', abbreviation: 'MN'},
    { name: 'Mississippi', abbreviation: 'MS'},
    { name: 'Missouri', abbreviation: 'MO'},
    { name: 'Montana', abbreviation: 'MT'},
    { name: 'Nebraska', abbreviation: 'NE'},
    { name: 'Nevada', abbreviation: 'NV'},
    { name: 'New Hampshire', abbreviation: 'NH'},
    { name: 'New Jersey', abbreviation: 'NJ'},
    { name: 'New Mexico', abbreviation: 'NM'},
    { name: 'New York', abbreviation: 'NY'},
    { name: 'North Carolina', abbreviation: 'NC'},
    { name: 'North Dakota', abbreviation: 'ND'},
    { name: 'Ohio', abbreviation: 'OH'},
    { name: 'oKLAHOMA', abbreviation: 'OK'},
    { name: 'Oregon', abbreviation: 'OR'},
    { name: 'Pennsylvania', abbreviation: 'PA'},
    { name: 'Puerto Rico', abbreviation: 'PR'},
    { name: 'Rhode Island', abbreviation: 'RI'},
    { name: 'South Carolina', abbreviation: 'SC'},
    { name: 'South Dakota', abbreviation: 'SD'},
    { name: 'Tennessee', abbreviation: 'TN'},
    { name: 'Texas', abbreviation: 'TX'},
    { name: 'Utah', abbreviation: 'UT'},
    { name: 'Vermont', abbreviation: 'VT'},
    { name: 'Virginia', abbreviation: 'VA'},
    { name: 'Washington', abbreviation: 'WA'},
    { name: 'West Virginia', abbreviation: 'WV'},
    { name: 'Wisconsin', abbreviation: 'WI'},
    { name: 'Wyoming', abbreviation: 'WY' }
  ];

  /**
   * init
   *
   * Runs a lot of jquery selections and initializes our base class.
   */
  LocationsApp.prototype._init = function() {
    this.html = $('html');
    
    this.body = $('body');

    this.appElement = $(UberLocations._Data.CLASSNAME.APP);
    
    this.element = $(UberLocations._Data.CLASSNAME.BASE);

    this.geolocate = new google.maps.Geocoder();

    GMaps = undefined;
  };


  /**
   * Will get the element and center it based on its height,
   * width and its windows width and height.
   *
   * @param {jquery|element} element
   *
   * @return
   */
  LocationsApp.prototype.centerModal = function(element) {

    console.log('center', element);

  };

  /**
   * cleanLocationData
   * Simply empties out the location data object.
   *
   */
  LocationsApp.prototype.cleanLocationData = function() {

    this._locationData = {};
  };

  app.LocationsApp = new LocationsApp();

})(UberLocations);
