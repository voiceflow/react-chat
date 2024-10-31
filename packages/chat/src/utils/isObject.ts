export const isObject = (data: any): data is object => {
  return !!data && !Array.isArray(data) && typeof data === 'object';
};
