import { createNanoEvents } from 'nanoevents';

export interface AppEvents {
  addToCart: (product: { id: string; count: number }) => void;
}

export const AppEmitter = createNanoEvents<AppEvents>();
