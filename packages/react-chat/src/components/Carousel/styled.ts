import Card from '@/components/Card';
import Icon from '@/components/Icon';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const BUTTON_SIZE = 42;
export const CAROUSEL_GUTTER_WIDTH = 12;

const tag = tagFactory(ClassName.CAROUSEL);

export const ButtonContainer = styled(tag('span', 'button'), {
  position: 'absolute',
  zIndex: 1,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$round',
  trans: ['background-color', 'box-shadow', 'opacity'],

  height: BUTTON_SIZE,
  width: BUTTON_SIZE,
  cursor: 'pointer',
  backgroundColor: '$white',
  color: '$black',
  boxShadow: '0 1px 3px 1px $shadow1, 0 0 0 1px $shadow3, 0 2px 4px -3px $shadow12, 0 5px 8px -8px $shadow12',
  border: 'none',

  [`& ${Icon.Frame}`]: {
    height: '$xxs',
    width: '$xxs',
    color: 'rgba(0,0,0,0.6)',
    trans: ['color'],
  },

  '&:hover': {
    boxShadow: '0 1px 4px 1px $shadow4, 0 0 0 1px $shadow4, 0 2px 4px -3px $shadow12, 0 5px 8px -8px $shadow12',
  },

  '&:active': {
    boxShadow: '0 1px 4px 1px $shadow8, 0 0 0 1px $shadow4, 0 2px 4px -3px $shadow12, 0 5px 8px -8px $shadow12',
  },

  [`
      &:hover ${Icon.Frame},
      &:active ${Icon.Frame}
    `]: {
    color: 'rgba(0,0,0,0.8)',
  },

  variants: {
    visible: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
      },
      false: {
        opacity: 0,
        pointerEvents: 'none',
      },
    },
    alignment: {
      left: {
        left: 48 - BUTTON_SIZE / 2,
      },
      right: {
        right: 70 - BUTTON_SIZE / 2,

        [`& ${Icon.Frame}`]: {
          transform: 'scaleX(-1)',
        },
      },
    },
  },
});

export const Container = styled(tag('div'), {
  display: 'flex',
  whiteSpace: 'nowrap',

  [`& ${Card.Container}`]: {
    height: 'fit-content',
    flexShrink: 0,
    marginLeft: CAROUSEL_GUTTER_WIDTH,

    '&:first-of-type': {
      marginLeft: 0,
    },
  },
});
