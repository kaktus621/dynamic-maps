
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
 * @param {{latitude: number, longitude: number}} location The location that
 *    should be displayed.
 * @param {number=} opt_zoom If set, the zoom level to show. Otherwise a default
 *    value will be applied.
 */
MapsFrame.prototype.setLocation = function(location, opt_zoom) {
  var params = 'latitude=' + location.latitude +
      '&longitude=' + location.longitude +
      (opt_zoom ? ('&zoom=' + opt_zoom) : '');

  $(this.element_).attr('src', chrome.extension.getURL('map.html#' + params));
};
