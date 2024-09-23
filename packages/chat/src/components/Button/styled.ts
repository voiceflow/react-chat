import { ClassName } from '@/constants';
import { classTagFactory } from '@/hocs';

import { containerStyle, resetStyle } from './styles.css';

export const tag = classTagFactory(ClassName.BUTTON);

export const Reset = tag('button', resetStyle);

export const Container = tag(Reset, containerStyle);
