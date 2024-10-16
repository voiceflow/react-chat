import { useEffect, useState } from 'react';

interface IClientRenderer {
  children: React.ReactNode;
}

export const ClientRenderer: React.FC<IClientRenderer> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return children;
};
