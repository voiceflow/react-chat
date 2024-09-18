import React from 'react';

export type Stringify<T> = T extends string | number ? T | `${T}` : T;

export type VariantProps<Variants extends Record<string, React.FC<any>>, Default extends keyof Variants = never> = {
  [K in keyof Variants]: (K extends Default ? { variant?: Stringify<K> } : { variant: Stringify<K> }) &
    React.ComponentProps<Variants[K]>;
}[keyof Variants];

export const bindVariants = <Variants extends Record<string, React.FC<any>>, Default extends keyof Variants = never>(
  variants: Variants,
  defaultVariant?: Default
) => {
  return React.forwardRef<HTMLElement, VariantProps<Variants, Default>>(
    ({ variant = defaultVariant, ...props }, ref) => {
      const Variant = variants[variant];

      if (!Variant) return null;

      return <Variant {...props} ref={ref} />;
    }
  );
};
