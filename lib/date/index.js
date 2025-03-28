function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { UTCDateMini } from "./mini.js";

/**
 * UTC date class. It maps getters and setters to corresponding UTC methods,
 * forcing all calculations in the UTC time zone.
 *
 * Combined with date-fns, it allows using the class the same way as
 * the original date class.
 *
 * This complete version provides not only getters, setters,
 * and `getTimezoneOffset`, but also the formatter functions, mirroring
 * all original `Date` functionality. Use this version when you need to format
 * a string or in an environment you don't fully control (a library).
 * For a minimal version, see `UTCDateMini`.
 */
export class UTCDate extends UTCDateMini {
  toString() {
    var date = this.toDateString();
    var time = this.toTimeString();
    return "".concat(date, " ").concat(time);
  }
  toDateString() {
    var weekday = weekdayFormat.format(this);
    var date = dateFormat.format(this);
    var year = this.getFullYear();
    return "".concat(weekday, " ").concat(date, " ").concat(year);
  }
  toTimeString() {
    var time = timeFormat.format(this);
    return "".concat(time, " GMT+0000 (Coordinated Universal Time)");
  }
  toLocaleString(locales, options) {
    return Date.prototype.toLocaleString.call(this, locales, _objectSpread({
      timeZone: "UTC"
    }, options));
  }
  toLocaleDateString(locales, options) {
    return Date.prototype.toLocaleDateString.call(this, locales, _objectSpread({
      timeZone: "UTC"
    }, options));
  }
  toLocaleTimeString(locales, options) {
    return Date.prototype.toLocaleTimeString.call(this, locales, _objectSpread({
      timeZone: "UTC"
    }, options));
  }
}
var weekdayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  timeZone: "UTC"
});
var dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC"
});
var timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour12: false,
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "UTC"
});