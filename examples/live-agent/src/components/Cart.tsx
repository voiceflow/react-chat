import { useEffect, useState } from 'react';

import { AppEmitter } from '../emitter';

export const Cart: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(
    () =>
      AppEmitter.on('addToCart', (product) => {
        setCount((count) => count + product.count);
      }),
    []
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: 25,
        right: 25,
      }}
    >
      Cart ({count})
    </div>
  );
};
