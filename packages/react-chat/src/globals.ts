import { createStitches } from '@voiceflow/stitches-react';
import Stitches from '@voiceflow/stitches-react/types/stitches';

import { getDefaultTheme } from './styles';

type CustomStitches = Stitches<'', {}>;

export let styled: CustomStitches['styled'] = null!;

export const initGlobals = (root: any) => {
  const stitches = createStitches(getDefaultTheme(root));

  styled = stitches.styled;
};
