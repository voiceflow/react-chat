import BaseButton from '@/components/Button';
import Message from '@/components/Message';
import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.TOOLTIP);

export const Button = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(BaseButton.Reset, 'button'), {
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
  return <Styled {...props} />;
};

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
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
  return <Styled {...props} />;
};
