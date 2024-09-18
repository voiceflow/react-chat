import clsx from 'clsx';
import { createElement, forwardRef } from 'react';

export const tagFactory =
  (
    prefix: string
  ): {
    <Tag extends keyof JSX.IntrinsicElements>(
      tag: Tag,
      suffix?: string
    ): (props: React.ComponentProps<Tag>) => React.ReactElement;
    <Props>(component: React.ComponentType<Props>, suffix?: string): (props: Props) => React.ReactElement;
  } =>
  (tagOrComponent: keyof JSX.IntrinsicElements | React.ComponentType<any>, suffix?: string) => {
    return forwardRef((props: any, ref) =>
      createElement(tagOrComponent, {
        ...props,
        ref,
        className: clsx(suffix ? `${prefix}--${suffix}` : prefix, props.className),
      })
    ) as any;
  };
