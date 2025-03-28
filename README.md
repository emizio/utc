# @date-fns/utc

---

We forked the repo because the library [replaces][1] non-UTC methods with UTC ones using a property set, which is a prohibited operation within Temporal Workflows. The library was automatically inserted into the workflow bundle (by `bundle-workflows.cjs`) and a static check prevented the workflow from starting properly. This was the case even when the problematic line in the library wasn't evaluated in any part of the workflow.

We replaced the `UTCDateMini` definition linked above with our own: [mini.js](src/date/mini.js). Rather than using property setting to replace non-UTC methods, our version uses method overrides over the `extend Date` class.

[1]: https://github.com/date-fns/utc/blob/d2b7442216d72a5dbdc23519aef067d998c7c58b/src/date/mini.js#L27

---

The package provides `Date` extensions `UTCDate` and `UTCDateMini` that perform all calculations in UTC rather than the system time zone.

Using it makes [date-fns] operate in UTC but can be also used without it.

Like everything else in the date-fns ecosystem, the library is build-size aware. The smallest component, `UTCDateMini,` is only `239 B`.

**Need more than just UTC?** See [@date-fns/tz](https://github.com/date-fns/tz) that provides full time zone support.

## Installation

```bash
npm install @date-fns/utc --save
```

## Usage

`UTCDate` and `UTCDateMini` have API identical to `Date`, but perform all calculations in UTC, which might be essential when calculating abstract date-time, i.e for rendering chart or calendar component:

```ts
import { UTCDate } from "@date-fns/utc";
import { addHours } from "date-fns";

// Given that the system time zone is America/Los_Angeles
// where DST happens at Sunday, 13 March 2022, 02:00:00

// Using system time zone will produce 03:00 instead of 02:00 because of DST:
const date = new Date(2022, 2, 13);
addHours(date, 2).toString();
//=> 'Sun Mar 13 2022 03:00:00 GMT-0700 (Pacific Daylight Time)'

// Using UTC will provide expected 02:00:
const utcDate = new UTCDate(2022, 2, 13);
addHours(utcDate, 2).toString();
//=> 'Sun Mar 13 2022 02:00:00 GMT+0000 (Coordinated Universal Time)'
```

### Difference between `UTCDate` and `UTCDateMini`

The main difference between `UTCDate` and `UTCDateMini` is the build footprint. The `UTCDateMini` is `239 B`, and the `UTCDate` is `504 B`. While the difference is slight, and `504 B` is not significant by any means, it might be essential in some environments and use cases.

Unlike `UTCDateMini` which implements only getters, setters, and `getTimezoneOffset`, `UTCDate` also provides formatter functions, mirroring all original `Date` functionality:

```ts
import { UTCDateMini, UTCDate } from "@date-fns/utc";

// UTCDateMini will format date-time in the system time zone:
new UTCDateMini(2022, 2, 13).toString();
//=> 'Sat Mar 12 2022 16:00:00 GMT-0800 (Pacific Standard Time)'

// UTCDate will format date-time in the UTC, like expected:
new UTCDate(2022, 2, 13).toString();
//=> 'Sun Mar 13 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
```

Even though `UTCDate` has a complete API, developers rarely use the formatter functions outside of debugging, so we recommend you pick the more lightweight `UTCDateMini` for internal use. However, in environments you don't control, i.e., when you expose the date from a library, using `UTCDate` will be a safer choice.

## API

- [`UTCDate`](#utcdate)
- [`utc`](#utc)

### `UTCDate`

`UTCDate` mirrors all the `Date` API, so refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) for the full list of methods and properties.

### `utc`

The `utc` function allows to specify the context for the [date-fns] functions (**starting from date-fns@4**):

```ts
import { isSameDay } from "date-fns";
import { utc } from "@date-fns/utc";

isSameDay("2024-09-09T23:00:00-04:00", "2024-09-10T10:00:00+08:00", {
  in: utc,
});
//=> true
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://kossnocorp.mit-license.org/)

[date-fns]: https://date-fns.org
