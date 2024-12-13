import type { StoryObj } from '@storybook/react';
import type { DecoratorFunction } from '@storybook/types';
import { useEffect, useMemo, useState } from 'react';

const ComponentNotFound: React.FC = () => <h2>🚨 Component not found! 🚨</h2>;

export interface IStoryEmbed {
  for: string; // This should be `keyof type Stories` but we load this dynamically
  name: string;
  props?: Record<string, any>;
  clientOnly?: boolean;
}

export const StoryEmbed: React.FC<IStoryEmbed> = ({ for: componentName, name, props, clientOnly = false }) => {
  const [shouldRender, setShouldRender] = useState(!clientOnly);
  const [stories, setStories] = useState<any>();

  useEffect(() => {
    const initStories = async () => {
      setStories(await import('@voiceflow/react-chat/stories'));
    };
    initStories();
  }, []);

  useEffect(() => setShouldRender(true), []);
  if (!stories) return null;

  const module = stories[componentName] as any;
  const target = (module as any)?.[name] as StoryObj<any>;

  const decorators = (target?.decorators || module?.default.decorators || []) as DecoratorFunction<any>[];

  if (!shouldRender) return null;

  if (!module || !target) return <ComponentNotFound />;

  const Component: React.ComponentType<any> =
    target.render ?? module.default.render ?? module.default.component ?? ComponentNotFound;

  const args = {
    ...module.default.args,
    ...target.args,
    ...props,
  };

  if (!decorators.length) {
    return <Component {...args} />;
  }

  const Decorated: React.FC = () => {
    const Story = useMemo(
      () =>
        decorators.reduce<Parameters<DecoratorFunction<any>>[0]>(
          (acc, decorator) => (config: any) => decorator(acc, config),
          ({ args } = {}) => <Component {...args} />
        ),
      [decorators]
    );

    return <Story {...module.default} {...target} args={args} />;
  };

  return <Decorated />;
};
