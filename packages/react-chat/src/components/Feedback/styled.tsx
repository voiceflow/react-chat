import { ClassName } from '@/constants';
import { useStitches } from '@/contexts';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.FEEDBACK);

export const Container = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div'), {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    marginTop: '8.5px',
  });
  return <Styled {...props} />;
};

export const Description = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div', 'description'), {
    color: '$darkGrey',
    marginRight: 4,
    lineHeight: 17,
    typo: {
      size: 12,
    },
  });
  return <Styled {...props} />;
};

export const ButtonsContainer = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('div', 'buttons'), {
    display: 'flex',
    gap: 4,
  });
  return <Styled {...props} />;
};

export const Button = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag('button', 'button'), {
    display: 'inline-flex',
    backgroundColor: 'transparent',
    border: 0,
    borderRadius: '$round',

    width: 24,
    height: 24,
    padding: 0,
    margin: 0,
    cursor: 'pointer',

    variants: {
      active: {
        false: {
          color: 'rgb(115 115 118 / 85%)',
          '&:hover': {
            color: 'rgb(115 115 118 / 100%)',
          },
        },

        true: {
          color: '$white',
          backgroundColor: '$primary',
        },
      },
      orientation: {
        positive: {
          transform: 'none',
        },
        negative: {
          transform: 'rotate(180deg)',
        },
      },
    },

    defaultVariants: {
      active: false,
      orientation: 'positive',
    },
  });
  return <Styled {...props} />;
};
