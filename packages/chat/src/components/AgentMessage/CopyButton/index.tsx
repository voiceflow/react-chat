import { Icon } from '@/main';

export const CopyButton = ({ value = '', className }: { value: React.ReactNode; className: string }) => {
  const handleClick = () => {
    if (value) {
      navigator.clipboard.writeText(value.toString()).catch((err) => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      <Icon svg="copy" />
    </button>
  );
};
