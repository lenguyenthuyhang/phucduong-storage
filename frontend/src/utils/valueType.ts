export const isObject = (value: Navigator | null) => value !== null && typeof value === 'object';
export const isFunction = (value: any) => typeof value === 'function';
export const isString = (value: any) => typeof value === 'string';
export const isBoolean = (value: any) => typeof value === 'boolean';
export const isNumber = (value: any) => typeof value === 'number';
export const isUndef = (value: any) => typeof value === 'undefined';
