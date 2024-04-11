import { styled } from "..";

export const ProductsContainer = styled('main', {
    display: "grid",
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    gap: '4rem',

    maxWidth: 1100,
    margin: '0 auto',

    '@media (max-width: 999px)': {
        gridTemplateColumns: 'none',
        padding: '2rem',

        p:{
            marginBottom: '2rem'
        }
    }
})
export const ImageContainer = styled('div', { 
    width: '100%',
    maxWidth: 576,
    height: 676,
    background: 'linear-gradient(180deg, #1ea483 0%, #7464d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    }
})
export const ProductDetails = styled('div', {
    display: 'flex',
    flexDirection: 'column',

    h1: {
        fontSize: '$2xl',
        color: '$grey300',
    },

    span: {
        marginTop: '1rem',
        display: 'block',
        fontSize: '$2xl',
        color: '$green300',
    },

    p: {
        marginTop: '2.5rem',
        fontSize: '$md',
        lineHeight: 1.6,
        color: '$grey300',
    },

    button: {
        marginTop: 'auto',
        backgroundColor: '$green500',
        border: 0,
        color: '$white',
        borderRadius: 8,
        padding: '1.25rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '$md',

        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed'
        },

        '&:not(:disabled)hover': {
            backgroundColor: '$green300'
        }
    }
})
