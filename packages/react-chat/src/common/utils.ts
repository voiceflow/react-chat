export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && !!object;
};

export const isEnumValue = <T extends { [k: string]: string }>(value: any, enumObject: T): value is T[keyof T] =>
  typeof value === 'string' && Object.values(enumObject).includes(value);

export { default as cuid } from 'cuid';
