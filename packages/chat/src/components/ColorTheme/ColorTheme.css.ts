import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});

export const primaryColorBlock = style({
  height: '250px',
  width: '250px',
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
  width: '100px',
  flexDirection: 'column',
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center',
});
