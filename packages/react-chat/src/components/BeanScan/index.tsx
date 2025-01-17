import Icon from '../Icon';
import { styled } from '../../styles';
import React from 'react';

const Container = styled('div', {
  minHeight: '100vh',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
});

const LogoContainer = styled('div', {
  position: 'relative',
  marginBottom: '2rem',
});

const MainIcon = styled(Icon, {
  width: '6rem',
  height: '6rem',
  color: '$stone800',
});

const SmallIcon = styled(Icon, {
  width: '3rem',
  height: '3rem',
  color: '$stone600',
  position: 'absolute',
  '&.top': {
    top: '-1rem',
    right: '-1rem',
    transform: 'rotate(45deg)',
  },
  '&.bottom': {
    bottom: '-1rem',
    left: '-1rem',
    transform: 'rotate(-45deg)',
  },
});

const Title = styled('h1', {
  fontSize: '1.875rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '$gray900',
});

const Subtitle = styled('p', {
  fontSize: '1rem',
  color: '$gray600',
  marginBottom: '4rem',
});

const Button = styled('button', {
  backgroundColor: '$gray900',
  color: 'white',
  padding: '0.75rem',
  borderRadius: '9999px',
  '&:hover': {
    backgroundColor: '$gray800',
    transition: 'background-color 0.2s',
  },
});

export const BeanScan: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <MainIcon svg="coffee" />
        <SmallIcon svg="coffee" className="top" />
        <SmallIcon svg="coffee" className="bottom" />
      </LogoContainer>
      <Title>BeanScan</Title>
      <Subtitle>Scan & Explore Origins</Subtitle>
      <Button>
        <Icon svg="arrowRight" />
      </Button>
    </Container>
  );
};

export default BeanScan;
