import flags from "./assets/flags.json";

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFlag(flags) {
  const index = getRandomInt(0, flags.length - 1);
  return flags[index];
}

function filterList(list, itemToRemove) {
  return list.filter(
    (item) => !(item.iso_country_code === itemToRemove.iso_country_code)
  );
}

export function getFlags() {
  const first = getRandomFlag(flags);
  const filtered = filterList(flags, first);
  const second = getRandomFlag(filtered);
  const third = getRandomFlag(filterList(filtered, second));

  return [first, second, third];
}
