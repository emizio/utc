export class UTCDateMini extends Date {
  constructor() {
    super();

    this.setTime(
      arguments.length === 0
        ? // Enables Sinon's fake timers that override the constructor
          Date.now()
        : arguments.length === 1
        ? typeof arguments[0] === "string"
          ? +new Date(arguments[0])
          : arguments[0]
        : Date.UTC(...arguments)
    );
  }

  getTimezoneOffset() {
    return 0
  }

  getFullYear() {
    return this.getUTCFullYear()
  }
  
  getMonth() {
    return this.getUTCMonth()
  }
  
  getDate() {
    return this.getUTCDate()
  }

  getDay() {
    return this.getUTCDay()
  }

  getHours() {
    return this.getUTCHours()
  }

  getMinutes() {
    return this.getUTCMinutes()
  }

  getSeconds() {
    return this.getUTCSeconds()
  }

  getMilliseconds() {
    return this.getUTCMilliseconds()
  }

  setFullYear(year, month, date) {
    return this.setUTCFullYear(...arguments)
  }

  setMonth(month, date) {
    return this.setUTCMonth(...arguments)
  }

  setDate(day) {
    return this.setUTCDate(day)
  }
  
  setHours(hours, minutes, seconds, ms) {
    return this.setUTCHours(...arguments)
  }
  
  setMinutes(minutes, seconds, ms) {
    return this.setUTCMinutes(...arguments)
  }

  setSeconds(seconds, ms) {
    return this.setUTCSeconds(...arguments)
  }
  
  setMilliseconds(milliseconds) {
    return this.setUTCMilliseconds(milliseconds)
  }
}
