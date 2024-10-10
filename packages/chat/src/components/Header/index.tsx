import { assignInlineVars } from '@vanilla-extract/dynamic';

import Avatar from '@/components/Avatar';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import type { IThemedComponent } from '@/types';

import Button from '../Button';
import Icon, { type IconProps } from '../Icon';
import { headerActionButton, headerContainer, headerInnerContainer, headerTitle } from './styles.css';

export interface HeaderActionProps {
  /**
   * The name of the SVG icon that will be used for the button or a React component.
   *
   * @see {@link https://github.com/voiceflow/react-chat/tree/master/packages/react-chat/src/assets/svg the available icons}
   */
  svg: IconProps['svg'];

  /**
   * A callback that is executed when the button is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface HeaderProps extends IThemedComponent {
  /**
   * The name of your assistant or title of the conversation.
   */
  title: string;

  /**
   * An image URL that will be rendered as a small {@link Avatar}.
   */
  image: string;

  /**
   * A list of actions that will appear as icon buttons.
   */
  actions?: HeaderActionProps[];
}

const Header: React.FC<HeaderProps> = ({ primaryColor, title, image, actions = [] }) => (
  <div style={assignInlineVars(PALETTE, { colors: createPalette(primaryColor) })} className={headerContainer}>
    <Avatar size="small" avatar={image} />
    <div className={headerInnerContainer}>
      <div className={headerTitle}>{title}</div>
      {actions.map(({ svg, onClick }, index) => (
        <Button className={headerActionButton()} onClick={onClick} key={index}>
          <Icon svg={svg} />
        </Button>
      ))}
      {/*<Button className={headerActionButton()}>
        <div style={{ display: 'flex', width: '24px', height: '24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.7478 7.31915C18.0496 7.01737 18.0496 6.5281 17.7478 6.22633C17.4461 5.92456 16.9568 5.92456 16.655 6.22633L12.2663 10.6151C12.1244 10.757 11.8943 10.757 11.7524 10.6151L7.36785 6.23053C7.06376 5.92644 6.57073 5.92644 6.26664 6.23053L6.22807 6.2691C5.92398 6.57319 5.92398 7.06622 6.22807 7.37032L10.6126 11.7548C10.7545 11.8968 10.7545 12.1268 10.6126 12.2688L6.24255 16.6388C5.94078 16.9406 5.94078 17.4298 6.24255 17.7316C6.54433 18.0334 7.0336 18.0334 7.33537 17.7316L11.7054 13.3616C11.8473 13.2197 12.0774 13.2197 12.2193 13.3616L16.6321 17.7744C16.9362 18.0785 17.4293 18.0785 17.7334 17.7744L17.7719 17.7358C18.076 17.4317 18.076 16.9387 17.7719 16.6346L13.3591 12.2218C13.2172 12.0799 13.2172 11.8498 13.3591 11.7079L17.7478 7.31915Z"
              fill="white"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      </Button>*/}
    </div>
  </div>
);

/**
 * Header for the chat widget with image, title and controls.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-chat-header--simple}
 */
export default Header;
