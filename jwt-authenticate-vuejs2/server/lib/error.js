// TODO: use class to replace
function VError(message, statusCode) {
  this.name = 'KError';
  this.message = message || 'Unknown Error';
  this.status = statusCode;
  this.stack = (new Error()).stack;
}
VError.prototype = Object.create(Error.prototype);
VError.prototype.constructor = VError;

module.exports = VError;
