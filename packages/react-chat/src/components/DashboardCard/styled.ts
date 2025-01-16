import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.DASHBOARD_CARD);

export const Container = styled(tag('div'), {
  borderRadius: '6px',
  boxShadow: `
    0px 1px 3px 1px #161A1E03,
    0px 4px 8px -6px #161A1E14,
    0px 1px 5px -4px #161A1E14,
    0px 0px 0px 1px #161A1E0A,
    0px 1px 0px 0px #161A1E05
  `,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'hidden',
  backgroundColor: '$white',
});
