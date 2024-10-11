import { useState } from 'react';

import Icon from '@/components/Icon';

export const CopyButton = ({ value = '', className }: { value: React.ReactNode; className: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleClick = () => {
    if (value) {
      navigator.clipboard.writeText(value.toString()).catch((err) => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  const handleMouseDown = () => {
    setIsCopied(true);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseLeave={() => setIsCopied(false)}
    >
      <Icon svg={isCopied ? 'checkmark' : 'copy'} />
    </button>
  );
};
