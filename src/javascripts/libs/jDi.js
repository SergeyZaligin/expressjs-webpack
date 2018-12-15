/**
 * Get key|value form by type json
 * @param {object} formSelector
 * @return {json}
 */
const serialize = (formSelector) => {
  const formEntries = new FormData(formSelector).entries();
  return JSON.stringify(Object.assign(...Array.from(formEntries, ([x, y]) => ({
    [x]: y,
  }))));
};

export {
  serialize,
};
