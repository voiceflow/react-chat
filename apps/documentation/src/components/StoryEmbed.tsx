import type { StoryObj } from '@storybook/react';
import type { DecoratorFunction } from '@storybook/types';
import { useEffect, useMemo, useState } from 'react';

const Stories = typeof window !== 'undefined' ? require('@voiceflow/react-chat/stories') : {};

const ComponentNotFound: React.FC = () => <h2>🚨 Component not found! 🚨</h2>;

export interface IStoryEmbed {
  for: keyof typeof Stories;
  name: string;
  props?: Record<string, any>;
  clientOnly?: boolean;
}

export const StoryEmbed: React.FC<IStoryEmbed> = ({ for: componentName, name, props, clientOnly = false }) => {
  const module = Stories[componentName];
  const target = (module as any)?.[name] as StoryObj<any>;
  const [shouldRender, setShouldRender] = useState(!clientOnly);

  const decorators = useMemo(
    () => (target?.decorators || module?.default.decorators || []) as DecoratorFunction<any>[],
    [target?.decorators, module?.default.decorators]
  );

  useEffect(() => setShouldRender(true), []);

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
