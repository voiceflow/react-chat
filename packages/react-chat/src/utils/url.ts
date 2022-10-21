export const LINK_ABOUT_ONLY_REGEX = /^about:[\w#%+.:=@~-]{2,256}\b([\w#%&+./:=?@~-]*)$/;
export const LINK_BITCOIN_ONLY_REGEX = /^bitcoin:[\dA-Za-z]{26,35}([\w#%&+./:=?@~-]*)$/;
export const LINK_CALLTO_ONLY_REGEX = /^callto:[+\d-\s()]+$/;
export const LINK_TEL_ONLY_REGEX = /^tel:[+\d-\s()]+$/;
export const LINK_SMS_ONLY_REGEX = /^sms:[+\d-\s()]+$/;
export const LINK_MAILTO_ONLY_REGEX = /^mailto:([^\s?]+)\b([\w#%&+./:=?@~-]*)$/;
export const LINK_IM_ONLY_REGEX = /^im:([^\s?]+)\b([\w#%&+./:=?@~-]*)$/;
export const LINK_FACETIME_ONLY_REGEX = /^facetime(-(audio|group))?:([^\s?]+|([+\d-()]+))$/;
export const LINK_SKYPE_ONLY_REGEX = /^skype:(\S+)\b$/;
export const LINK_WEBCALL_ONLY_REGEX = /^webcal:(\S+)\b$/;

export const STRICT_LINKS_REGEXS = [
  LINK_ABOUT_ONLY_REGEX,
  LINK_BITCOIN_ONLY_REGEX,
  LINK_CALLTO_ONLY_REGEX,
  LINK_TEL_ONLY_REGEX,
  LINK_SMS_ONLY_REGEX,
  LINK_MAILTO_ONLY_REGEX,
  LINK_IM_ONLY_REGEX,
  LINK_FACETIME_ONLY_REGEX,
  LINK_SKYPE_ONLY_REGEX,
  LINK_WEBCALL_ONLY_REGEX,
];

export const isAnyStrictLink = (str: string): boolean => !!STRICT_LINKS_REGEXS.some((regexp) => str.match(regexp));

export const getValidHref = (href: string): string => (href.startsWith('//') || href.includes('://') || isAnyStrictLink(href) ? href : `//${href}`);

/**
 * opens url in  anew tab, noopener and noreferrer is set to true by default
 */
export const openURLInANewTab = (url: string, features = 'noopener=true,noreferrer=true'): void =>
  window.open(getValidHref(url), '_blank', features)?.focus();
