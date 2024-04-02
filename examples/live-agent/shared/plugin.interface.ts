declare global {
  interface Window {
    vfplugin?: Record<string, Plugin>;
  }
}

export interface Plugin {
  name: string;
  Message?: React.FC<any>;
}
