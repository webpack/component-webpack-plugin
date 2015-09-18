var clone;

if ('undefined' == typeof window) {
  clone = require('clone-component');
} else {
  clone = require('clone');
}

module.exports = Bounds;


function calculateReversed(self) {
  return self._min
    && self._max
    && self.before(self._max);
}

function Bounds(obj) {
  if (obj) return mixin(obj);
}

function mixin(obj) {
  for (var key in Bounds.prototype) {
    obj[key] = Bounds.prototype[key];
  }
  return obj;
}

Bounds.prototype.compare = function(fn) {
  this._compare = fn;
  return this;
};

Bounds.prototype.distance = function(fn) {
  this._distance = fn;
  return this;
};

Bounds.prototype.min = function(v) {
  if (!arguments.length) {
    return this._min;
  }
  this._min = v;
  delete this._reversed;
  return this;
};

Bounds.prototype.max = function(v) {
  if (!arguments.length) {
    return this._max;
  }
  this._max = v;
  delete this._reversed;
  return this;
};

Bounds.prototype.before = function(v) {
  return this._min && (this._compare(v, this._min) < 0);
};

Bounds.prototype.after = function(v) {
  return this._max && (this._compare(v, this._max) > 0);
};

Bounds.prototype.out = function(v) {
  return this.before(v) || this.after(v);
};

Bounds.prototype.in = function(v) {
  return !this.out(v);
};

Bounds.prototype.valid = function(v) {
  if (this.reversed()) {
    return !this.after(v) || !this.before(v);
  }
  return this.in(v);
};

Bounds.prototype.invalid = function(v) {
  return !this.valid(v);
};

Bounds.prototype.reversed = function() {
  if (this._reversed === undefined) {
    this._reversed = calculateReversed(this);
  }
  return this._reversed;
};

Bounds.prototype.restrict = function(v) {
  if (this.reversed()) {
    if(this.after(v) && this.before(v)) {
      // select closer bound
      return (this._distance(this._max, v) < this._distance(v, this._min))
        ? clone(this._max)
        : clone(this._min);
    }
    return v;
  }
  if(this.before(v)) {
    return clone(this._min);
  }
  if(this.after(v)) {
    return clone(this._max);
  }
  return v;
};
