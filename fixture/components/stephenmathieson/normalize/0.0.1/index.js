
/**
 * Normalize the events provided to `fn`
 *
 * @api public
 * @param {Function|Event} fn
 * @return {Function|Event}
 */

exports = module.exports = function (fn) {
  // handle functions which are passed an event
  if (typeof fn === 'function') {
    return function (event) {
      event = exports.normalize(event);
      fn.call(this, event);
    };
  }

  // just normalize the event
  return exports.normalize(fn);
};

/**
 * Normalize the given `event`
 *
 * @api private
 * @param {Event} event
 * @return {Event}
 */

exports.normalize = function (event) {
  event = event || window.event;

  event.target = event.target || event.srcElement;

  event.which = event.which ||  event.keyCode || event.charCode;

  event.preventDefault = event.preventDefault || function () {
    this.returnValue = false;
  };

  event.stopPropagation = event.stopPropagation || function () {
    this.cancelBubble = true;
  };

  return event;
};
