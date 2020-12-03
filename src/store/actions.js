export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function createRequestType(base) {
  return [REQUEST, SUCCESS, FAILURE]
      .reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
      }, {});
}

export function action(type, payload = {}) {
  return {type, payload};
}
