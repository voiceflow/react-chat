import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/old-styles';

import { buttonStyles } from '../Button/styles.css';

const tag = tagFactory(ClassName.PROMPT);

export const Container = styled(tag('div'), {
  padding: '$4 $4 $3 $4',
  borderRadius: '$1',
  backgroundColor: '$white',
  boxShadow: '0 12px 48px 4px $shadow12',

  [`& .${buttonStyles.classNames.base}`]: {
    width: '100%',
    marginTop: '$1',

    '&:first-of-type': {
      marginTop: 0,
    },
  },
});
