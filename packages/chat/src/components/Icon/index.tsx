import * as SVGs from '@/assets/svg';

export type SVG = keyof typeof SVGs;

export interface IconProps {
  /**
   * The name of the SVG icon to be rendered or a React component.
   *
   * @see {@link https://github.com/voiceflow/react-chat/tree/master/packages/react-chat/src/assets/svg the available icons}
   */
  svg: SVG | React.ComponentType;
}

const Icon: React.FC<IconProps> = ({ svg, ...props }) => {
  const SVG = typeof svg === 'string' ? SVGs[svg] : svg;

  return (
    <div style={{ display: 'flex' }} {...props}>
      <SVG />
    </div>
  );
};

/**
 * A component for rendering a pre-packaged SVG icon.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/core-icon--default}
 */
export default Icon;
