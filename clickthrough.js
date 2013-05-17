
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
  $('#contentPane').on('mouseover', 'div[style*="https://maps-api-ssl"]', null,
      this.onStaticMapDivMouseOver_.bind(this));
};


/**
 * Handler that will be called when the user hovers over a div with a static
 * maps image as background (first appearance sometime in November '12).
 * @param {Object} eventData Information about the event.
 * @private
 */
ClickthroughHandler.prototype.onStaticMapDivMouseOver_ = function(eventData) {
  var mapDiv = eventData.target;
  // Make sure the drop shadows and place badge stay on top of the map.
  $('div', mapDiv.parentNode).css('z-index', '2');
  // Apart from the node itself
  $(mapDiv).css('z-index', '0');

  var locationData = this.extractLocationData_(mapDiv.style.backgroundImage);

  // Calculate the offset of the map center to the actual visible center so that
  // the marker is always perfectly on top of the static maps marker
  var containerHeight = mapDiv.parentNode.getBoundingClientRect().height;
  var mapHeight = parseInt(locationData.size.height);
  locationData.verticalOffset = (containerHeight - mapHeight) / 2;

  this.mapsFrame_.initialize(locationData);
  this.mapsFrame_.render(eventData.target.parentNode);
};


/**
 * Given a static maps URL, the method extracts all encoded information about
 * the location, such as coordinates and zoom level.
 * @param {string} url The Static Maps URL.
 * @return {Object.<string, (Object|string)} Information about the location
 *    encoded in the given URL.
 * @private
 */
ClickthroughHandler.prototype.extractLocationData_ = function(url) {
  var center = /center=([-\d\.]+),([-\d\.]+)/i.exec(url);
  var markers = /markers=([-\d\.]+),([-\d\.]+)/i.exec(url);
  var size = /size=(\d+)x(\d+)/i.exec(url);
  var zoom = /zoom=([\d]+)/i.exec(url);
  var visualRefresh = /visual_refresh=(true|false)/i.exec(url);

  return {
    center: {
      latitude: center[1],
      longitude: center[2]
    },
    markers: {
      latitude: markers[1],
      longitude: markers[2]
    },
    size: {
      width: size[1],
      height: size[2]
    },
    visualRefresh: (!!visualRefresh && visualRefresh[1] == 'true'),
    zoom: zoom[1]
  };
};
