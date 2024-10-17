import type { ComplexStyleRule } from '@vanilla-extract/css';
import type { RecipeVariants, RuntimeFn } from '@vanilla-extract/recipes';
import type { Simplify } from 'type-fest';

export type VariantStyleRules = Record<string, Record<string, ComplexStyleRule | string>>;

export type VariantProps<RecipeFn extends RuntimeFn<VariantStyleRules>> = Exclude<
  Simplify<RecipeVariants<RecipeFn>>,
  undefined | null
>;
