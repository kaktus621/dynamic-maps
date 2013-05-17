
/**
 * @fileoverview Component that manages a sandboxed Google Maps Iframe.
 * @author kaktus621@gmail.com (Martin Matysiak)
 */



/**
 * The component responsible for a Google Maps Iframe.
 * @constructor
 */
MapsFrame = function() {
  /**
   * The iframe this class is taking care of.
   * @type {!Element}
   * @private
   */
  this.element_ = document.createElement('iframe');
  $(this.element_).addClass('cmMapsFrame');
};


/**
 * Renders the component inside the given parent node.
 * @param {Element} parentNode The parent node.
 */
MapsFrame.prototype.render = function(parentNode) {
  // Remove the element from the DOM first, in case it's currently rendered.
  $(this.element_)
      .detach()
      .hide()
      .appendTo(parentNode)
      .fadeIn(1000);
};


/**
 * Passes down the new location to the iframe.
 * @param {Object.<string, (Object|string)>} locationData Data for the maps
 *    frame to use.
 */
MapsFrame.prototype.initialize = function(locationData) {
  $(this.element_).attr('src', chrome.extension.getURL('map.html#' +
      JSON.stringify(locationData)));
};
