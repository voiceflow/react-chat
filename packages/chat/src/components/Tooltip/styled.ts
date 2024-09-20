import BaseButton from '@/components/Button';
import Message from '@/components/Message';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.TOOLTIP);

export const Button = styled(tag(BaseButton.Reset, 'button'), {
  height: '$md',
  border: '1px solid $medGrey',
  borderTopColor: 'rgba(223,223,223,0.5)',
  borderRadius: '$1',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  typo: { weight: '$2' },
  color: '$primary',
  backgroundColor: '#fbfbfb',
});

export const Container = styled(tag('div'), {
  display: 'inline-flex',
  flexDirection: 'column',

  variants: {
    withAction: {
      true: {
        boxShadow: '0 1px 2px $shadow2',

        [`& ${Message.Debug.Container}`]: {
          boxShadow: 'none',
          borderBottom: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
  },
});
