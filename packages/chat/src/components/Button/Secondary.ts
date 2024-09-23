import { ButtonVariant } from './constants';
import { Container, tag } from './styled';
import { secondaryButtonStyles } from './styles.css';

export const SecondaryButton = tag(Container, secondaryButtonStyles, ButtonVariant.SECONDARY);
