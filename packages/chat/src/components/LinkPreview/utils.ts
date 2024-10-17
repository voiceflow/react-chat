type LinkType = 'pdf' | 'url' | 'custom';

const isValidHttpUrl = (value: string) => {
  let url;

  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const getImageTypeFromUrl = (value: string): LinkType => {
  if (value.endsWith('.pdf')) {
    return 'pdf';
  }

  if (isValidHttpUrl(value)) {
    return 'url';
  }

  return 'custom';
};
