import * as SVGs from '@/assets/svg';

import { Frame } from './styled';

export type SVG = keyof typeof SVGs;

export interface IconProps extends React.ComponentProps<typeof Frame> {
  svg: SVG | React.ComponentType;
}

const Icon: React.FC<IconProps> = ({ svg, ...props }) => {
  const SVG = typeof svg === 'string' ? SVGs[svg] : svg;

  return (
    <Frame {...props}>
      <SVG />
    </Frame>
  );
};

export default Object.assign(Icon, {
  Frame,
});
