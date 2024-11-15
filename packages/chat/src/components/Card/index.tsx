import clsx from 'clsx';
import { useContext, useMemo } from 'react';

import { ClassName } from '@/constants';
import { RuntimeStateAPIContext } from '@/contexts';
import { fadeInAndUp } from '@/styles/animation-utils.css';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import { cardActions, cardContainer, cardContent, cardDescription, cardImage, cardTitle } from './styles.css';
import type { CardProps } from './types';

/**
 * A titled card with content and optional controls.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-card--simple}
 */
export const Card: React.FC<CardProps> = ({ title, description, image, actions = [], className = '' }) => {
  const runtime = useContext(RuntimeStateAPIContext);

  const buttons = useMemo(() => actions.filter(({ name }) => !!name), [actions]);

  return (
    <div className={clsx(ClassName.CARD, cardContainer, className, fadeInAndUp)}>
      {!!image && <img className={cardImage} src={image} />}
      {(title || description) && (
        <div className={cardContent}>
          {title && <div className={cardTitle}>{title}</div>}
          {description && <div className={cardDescription}>{description}</div>}
        </div>
      )}
      {!!buttons?.length && (
        <div className={cardActions}>
          {buttons.map(({ request, name }, index) => (
            <Button variant={ButtonVariant.SECONDARY} onClick={() => runtime.interact(request, name)} key={index}>
              {name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
