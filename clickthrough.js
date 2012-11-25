
/**
 * @fileoverview Main script that will be injected to Google+.
 * @author kaktus621@gmail.com (Martin Matysiak)
 */


// Will be executed once the document is ready.
$(document).ready(function() {
  new ClickthroughHandler();
});



/**
 * The main class that will be instantiated on load.
 * @constructor
 */
ClickthroughHandler = function() {
  // Prepare an invisible (sandboxed) iframe.
  this.mapsFrame_ = new MapsFrame();

  // Listen for events on static maps images.
  $('#contentPane').on('mouseover', 'img[src^="https://maps-api-ssl"]', null,
      this.onStaticMapMouseOver_.bind(this));
  $('#contentPane').on('mouseover', 'div[style*="https://maps-api-ssl"]', null,
      this.onStaticMapDivMouseOver_.bind(this));
};


/**
 * Handler that will be called when the user hovers over a static maps image.
 * @param {Object} eventData Information about the event.
 * @private
 */
ClickthroughHandler.prototype.onStaticMapMouseOver_ = function(eventData) {
  // Make sure the drop shadows and place badge stay on top of the map.
  $('div', eventData.target.parentNode).css('z-index', '2');

  var locationData = this.extractLocationData_(eventData.target.src);
  this.mapsFrame_.setLocation(locationData.coordinates, locationData.zoom);
  this.mapsFrame_.render(eventData.target.parentNode);
};


/**
 * Handler that will be called when the user hovers over a div with a static
 * maps image as background (first appearance sometime in November '12).
 * @param {Object} eventData Information about the event.
 * @private
 */
ClickthroughHandler.prototype.onStaticMapDivMouseOver_ = function(eventData) {
  // Make sure the drop shadows and place badge stay on top of the map.
  $('div', eventData.target.parentNode).css('z-index', '2');
  // Apart from the node itself
  $(eventData.target).css('z-index', '0');

  var locationData = this.extractLocationData_(
      eventData.target.style.backgroundImage);
  this.mapsFrame_.setLocation(locationData.coordinates, locationData.zoom);
  this.mapsFrame_.render(eventData.target.parentNode);
};


/**
 * Given a static maps URL, the method extracts all encoded information about
 * the location, such as coordinates and zoom level.
 * @param {string} url The Static Maps URL.
 * @return {{coordinates: {latitude: number, longitude: number}, zoom: number?}}
 *    Information about the location encoded in the given URL.
 * @private
 */
ClickthroughHandler.prototype.extractLocationData_ = function(url) {
  var center = /center=([-\d\.]+),([-\d\.]+)/i.exec(url);
  var zoom = /zoom=([\d]+)/i.exec(url);

  return {
    coordinates: {
      latitude: center[1],
      longitude: center[2]
    },
    zoom: zoom[1]
  };
};
