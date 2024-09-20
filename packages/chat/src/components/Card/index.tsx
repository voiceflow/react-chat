import { useContext, useMemo } from 'react';

import Button from '@/components/Button';
import Image from '@/components/Image';
import { RuntimeStateAPIContext } from '@/contexts';

import { Container, Content, Description, Header, Link } from './styled';
import type { CardProps } from './types';
import { isValidHttpUrl } from './utils';

export type { CardProps } from './types';

const Card: React.FC<CardProps> = ({ title, description, image, actions = [] }) => {
  const runtime = useContext(RuntimeStateAPIContext);
  const isLink = isValidHttpUrl(description);

  const buttons = useMemo(() => actions.filter(({ name }) => !!name), [actions]);

  return (
    <Container>
      {!!image && <Image image={image} />}
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
        {buttons.map(({ request, name }, index) => (
          <Button onClick={() => runtime.interact(request, name)} key={index}>
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
