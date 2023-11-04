import queryString from 'query-string';

export const extendQueryParams = (url, paramsObj, isArray) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);

  const paramsToAdd =
    typeof paramsObj === 'string' ? queryString.parse(paramsObj) : paramsObj;

  for (const [key, value] of Object.entries(paramsToAdd)) {
    if (searchParams.has(key)) {
      const existingValue = searchParams.get(key);
      if (isArray)
        if (Array.isArray(existingValue))
          searchParams.set(key, [...existingValue, value]);
        else searchParams.set(key, existingValue.split(',').concat(value));
      else searchParams.set(key, value);
    } else searchParams.set(key, value);
  }
  urlObj.search = searchParams.toString();
  return urlObj.toString();
};

export const removeQueryParamIfExists = (url, paramToRemove) => {
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);
  if (searchParams.has(paramToRemove)) {
    searchParams.delete(paramToRemove);
    urlObj.search = searchParams.toString();
    return urlObj.toString();
  }
  return urlObj.toString();
};

export const getFilteredLocation = (location, excludedParams) => {
  const queryParams = queryString.parse(location.search);

  const filteredQueryParams = Object.keys(queryParams)
    .filter((key) => !excludedParams.includes(key))
    .reduce((obj, key) => {
      obj[key] = queryParams[key];
      return obj;
    }, {});
  // const newSearch = queryString.stringify(filteredQueryParams);
  return {
    // ...location,
    // search: newSearch,
    filteredQueryParams,
  };
};

export const getIncludedParams = (location, params) => {
  const queryParams = new URLSearchParams(location.search);
  const newParams = {};
  params.forEach((param) => {
    if (queryParams.has(param)) newParams[param] = queryParams.get(param);
  });
  const resParams = new URLSearchParams(newParams);
  return resParams.toString();
};

export const isUrlContainsParams = (url) => {
  const urlObject = new URL(url);
  return urlObject === '' || urlObject.search.length > 1 ? true : false;
};
