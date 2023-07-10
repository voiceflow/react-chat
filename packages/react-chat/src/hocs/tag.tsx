import clsx from 'clsx';
import { createElement, forwardRef } from 'react';

export const tagFactory =
  (
    prefix: string
  ): {
    <Tag extends keyof JSX.IntrinsicElements>(tag: Tag, suffix?: string): (props: React.ComponentProps<Tag>) => React.ReactNode;
    <Props extends any>(component: React.ComponentType<Props>, suffix?: string): (props: Props) => React.ReactNode;
  } =>
  (tagOrComponent: keyof JSX.IntrinsicElements | React.ComponentType<any>, suffix?: string) => {
    return forwardRef((props: any, ref) =>
      createElement(tagOrComponent, { ...props, ref, className: clsx(suffix ? `${prefix}--${suffix}` : prefix, props.className) })
    );
  };
