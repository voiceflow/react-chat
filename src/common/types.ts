import { RuntimeOptions } from '@/hooks';

export interface ChatConfig extends Omit<RuntimeOptions, 'verify'> {
  projectID: string;
  assistant: {
    name: string;
    description: string;
    image: string;
  };
  color?: string;
  messageDelay?: number;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && !!object;
};
