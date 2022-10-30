export { isObject } from 'remeda';

export const isEnumValue = <T extends { [k: string]: string }>(value: any, enumObject: T): value is T[keyof T] =>
  typeof value === 'string' && Object.values(enumObject).includes(value);

export { default as cuid } from 'cuid';
