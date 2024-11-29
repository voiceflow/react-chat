import { style } from '@vanilla-extract/css';

export const testContainer = style({
  background: 'beige',
  position: 'relative',
  display: 'flex',
});
export const testAvatarColumn = style({
  background: 'blue',
  width: '54px',

  transition: 'align-items 0.5s ease', // Smooth transition for alignment changes
});

export const testMessageColumn = style({
  background: 'red',
  width: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const testAvatar = style({
  background: 'green',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  transition: 'transform 0.5s ease', // Smooth transition for movement
});

export const testMessage = style({
  background: 'yellow',
  padding: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: 'black',
  fontSize: '16px',
  fontWeight: 'bold',
  fontFamily: 'Arial',
  textTransform: 'uppercase',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.2s ease',
});
