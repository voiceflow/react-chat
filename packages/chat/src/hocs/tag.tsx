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

// Like `tagFactory` above, but you can give it another classname
// to pass into the created element
export const classTagFactory =
  (
    prefix: string
  ): {
    <Tag extends keyof JSX.IntrinsicElements>(
      tag: Tag,
      clsName: string,
      suffix?: string
    ): (props: React.ComponentProps<Tag>) => React.ReactElement;
    <Props>(
      component: React.ComponentType<Props>,
      clsName: string,
      suffix?: string
    ): (props: Props) => React.ReactElement;
  } =>
  (tagOrComponent: keyof JSX.IntrinsicElements | React.ComponentType<any>, clsName: string, suffix?: string) => {
    return forwardRef((props: any, ref) =>
      createElement(tagOrComponent, {
        ...props,
        ref,
        className: clsx(suffix ? `${prefix}--${suffix}` : prefix, clsName, props.className),
      })
    ) as any;
  };
