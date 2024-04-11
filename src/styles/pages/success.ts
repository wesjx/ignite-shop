import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '3rem',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
});

export const ImageContainer = styled('div', {
  padding: '0.25rem',
  marginTop: '4rem',
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  
  div:{
    borderRadius: 50,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    boxShadow:' 0 40px 40px rgba(0, 0, 0, 0.8), 0 8px 30px rgba(0, 0, 0, 0.88)',
    margin: '0 -5rem',
    
    img: {
      objectFit: 'cover',
    }
  },

});