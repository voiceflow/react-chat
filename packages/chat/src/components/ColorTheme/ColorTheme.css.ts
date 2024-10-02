import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});

export const primaryColorBlock = style({
  width: '250px',
  height: '250px',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
});

export const derivativeColorContainer = style({
  display: 'flex',
  gap: '1rem',
});

export const derivativeColor = style({
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  color: 'white',
  padding: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
});
