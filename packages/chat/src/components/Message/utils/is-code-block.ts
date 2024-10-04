export const isCodeBlock = (children: React.ReactNode): boolean => {
  if (typeof children === 'string') {
    return (
      (children.startsWith('```') && (children.endsWith('```') || children.endsWith('```\n'))) ||
      children.startsWith('\n```')
    );
  }
  return false;
};
