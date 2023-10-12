import { useContext, useMemo } from 'react';

import type { RuntimeAction } from '@/common';
import Button from '@/components/Button';
import Image from '@/components/Image';
import { RuntimeAPIContext } from '@/contexts';

import { Container, Content, Description, Header, Link } from './styled';
import { isValidHttpUrl } from './utils';

export interface CardActionProps {
  /**
   * The label that will appear on the button.
   */
  name: string;

  /**
   * the request that will be sent by the runtime when the button is clicked.
   */
  request: RuntimeAction;
}

export interface CardProps {
  /**
   * The title of the card.
   */
  title: string;

  /**
   * Text content of the card.
   * If the string is a valid URL it will be rendered in a {@link Link}.
   */
  description: string;

  /**
   * An image URL that will render at the top of the card if provided.
   */
  image?: string | undefined | null;

  /**
   * A list of actions that will appear as button controls at the bottom of the card.
   */
  actions?: CardActionProps[] | undefined;
}

export const isValidCard = (card: CardProps) => {
  return !!card.title || !!card.description || !!card.image || !!card.actions?.filter(({ name }) => !!name).length;
};

const Card: React.FC<CardProps> = ({ title, description, image, actions = [] }) => {
  const runtime = useContext(RuntimeAPIContext);
  const isLink = isValidHttpUrl(description);

  const buttons = useMemo(() => actions.filter(({ name }) => !!name), [actions]);

  return (
    <Container>
      {!!image && <Image.Background image={image} />}
      <Content>
        {!!title && <Header>{title}</Header>}
        {!!description &&
          (isLink ? (
            <Link rel="noopener noreferrer" href={description} target="_blank">
              {description}
            </Link>
          ) : (
            <Description>{description}</Description>
          ))}
        {buttons.map(({ name, request }, index) => (
          <Button onClick={() => runtime.send(name, request)} key={index}>
            {name}
          </Button>
        ))}
      </Content>
    </Container>
  );
};

/**
 * A titled card with content and optional controls.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-card--simple}
 */
export default Object.assign(Card, {
  Container,
});
