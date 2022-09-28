export const hideButton = (el: HTMLButtonElement) => {
  // eslint-disable-next-line no-param-reassign
  el.style.opacity = '0';
};

export const showButton = (el: HTMLButtonElement) => {
  // eslint-disable-next-line no-param-reassign
  el.style.opacity = '1';
};
