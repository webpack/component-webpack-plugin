/**
 * Module dependencies.
 */

var Tip = require('tip')
  , q = require('query')
  , inherit = require('inherit');

/**
 * Expose `Popover`.
 */

module.exports = Popover;

/**
 * Initialize a `Popover` with the given `content`
 * and optional `title`.
 *
 * @param {Mixed} content
 * @param {Mixed} title
 * @api public
 */

function Popover(content, title) {
  Tip.call(this, require('./template'));
  this.classname = 'popover';
  this.classes.add('popover');
  if (title) this.title(title);
  else this.hideTitle();
  this.content(content);
  if (Popover.effect) this.effect(Popover.effect);
}

/**
 * Inherits from `Tip.prototype`.
 */

inherit(Popover, Tip);

/**
 * Replace `content`.
 *
 * @param {Mixed} content
 * @return {Popover}
 * @api public
 */

Popover.prototype.content = function(content){
  var contentEl = q('.popover-content', this.el);
  if (typeof content === 'string')
    contentEl.innerHTML = content;
  else
    contentEl.appendChild(content);
  return this;
};

/**
 * Change `title`.
 *
 * @param {String} title
 * @return {Popover}
 * @api public
 */

Popover.prototype.title = function(title){
  var titleEl = q('.popover-title', this.el);
  if (typeof title === 'string')
    titleEl.innerHTML = title;
  else
    titleEl.appendChild(title);
  return this;
};

/**
 * Hide the title.
 *
 * @return {Popover}
 * @api private
 */

Popover.prototype.hideTitle = function(){
  var titleEl = q('.popover-title', this.el);
  titleEl.parentNode.removeChild(titleEl);
  return this;
};
