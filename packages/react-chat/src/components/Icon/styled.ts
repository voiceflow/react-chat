import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles/theme';

const tag = tagFactory(ClassName.ICON);

export const Frame = styled(tag('div'), { display: 'flex' });
