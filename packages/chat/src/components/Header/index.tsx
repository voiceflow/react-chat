import clsx from 'clsx';

import { Avatar } from '@/components/Avatar';
import { ClassName } from '@/constants';
import { DEFAULT_CHAT_AVATAR } from '@/dtos/AssistantOptions.dto';

import { Button } from '../Button';
import { Icon, type IconProps } from '../Icon';
import { headerActionButton, headerActions, headerContainer, headerInnerContainer, headerTitle } from './styles.css';

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

export interface HeaderProps {
  /**
   * The name of your assistant or title of the conversation.
   */
  title: string;

  /**
   * Should we show the image in the header.
   */
  showImage: boolean;

  /**
   * An image URL that will be rendered as a small {@link Avatar}.
   */
  image?: string;

  /**
   * A list of actions that will appear as icon buttons.
   */
  actions?: HeaderActionProps[];
}

/**
 * Header for the chat widget with image, title and controls.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-chat-header--simple}
 */
export const Header: React.FC<HeaderProps> = ({ title, showImage, image, actions = [] }) => {
  return (
    <div className={clsx(ClassName.HEADER, headerContainer)}>
      {showImage && <Avatar size="small" avatar={image ?? DEFAULT_CHAT_AVATAR} />}
      <div className={headerInnerContainer}>
        <div className={headerTitle({ hasAvatar: showImage })}>{title}</div>
        <div className={headerActions}>
          {actions.map(({ svg, onClick }, index) => (
            <Button className={headerActionButton()} onClick={onClick} key={index}>
              <Icon svg={svg} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
