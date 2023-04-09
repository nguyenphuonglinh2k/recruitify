export const snakeToCamelCase = str => {
  if (str.includes("_") || str.includes("-"))
    return str
      .toLowerCase()
      .replace(/([-_][a-z])/g, group =>
        group.toUpperCase().replace("-", "").replace("_", ""),
      );

  return str;
};

export const toCamel = obj => {
  var newObj, origKey, newKey, value;
  if (obj instanceof Array) {
    return obj.map(function (item) {
      if (typeof item === "object") {
        value = toCamel(item);
      } else if (typeof item === "string") {
        value = item;
      }
      return value;
    });
  } else {
    newObj = {};
    for (origKey in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(origKey)) {
        newKey = snakeToCamelCase(origKey);
        value = obj[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newObj[newKey] = value;
      }
    }
  }
  return newObj;
};
