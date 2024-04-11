import * as Dialog from "@radix-ui/react-dialog";

import { styled } from "@/styles";

export const DialogOverlay = styled(Dialog.Overlay, {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    inset: 0,
});

export const DialogProduct = styled('div', {
    display: 'flex',
    gap: '1rem',
    paddingBottom: '2rem',

    img:{
        borderRadius: 8,
        width: '100px',
        height: '100px',
        background: 'linear-gradient(180deg, #1ea483 0%, #7464d4 100%)',
    },

    header:{
        width: '20rem',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },

    section:{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',

        div:{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
        }
    },

    h2:{
        fontSize: '1.225rem',
        fontWeight: '400',
        color: '$grey300'
    },

    p:{
        fontSize: '1.225rem',
        fontWeight: 'bold'
    },

    button:{
        width: '60px',
        color: '$green500',
        background: 'transparent',
        border: 0,
        fontSize: '1rem',
        fontWeight: 'bold', 
        cursor: 'pointer',   

        '&:hover':{
            color: '$green300',
        }
    }

})

export const DialogPrice = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1rem',
    position: 'fixed',
    bottom: '0',

    button:{
        cursor: 'pointer',
        background: '$green300',
        borderRadius: 8,
        padding: '1.25rem 7.75rem',
        color: '$grey100',
        fontSize: '1.25rem',
        margin: '3.45rem 0 2rem 0',

        '&:disabled':{
            cursor: 'not-allowed',
            opacity: 0.5,
        },

        '&:not(:disabled):hover':{
            opacity: 0.8,
        }
    }
})

export const Quantity = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    color: '$grey300',
    fontSize: '1rem',

    span:{
        fontSize: '1.225rem'
    }
})

export const Total = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.225rem',
    fontWeight: 'bold',

    span:{
        fontSize: '1.5rem'
    }
})

export const DialogContent = styled(Dialog.Content, {
    backgroundColor: '$grey800',
    position: 'fixed',
    top: '0',
    right: '0',
    width: '30rem',
    height: '100vh',
    padding: '2rem',
    boxShadow:' 0 40px 40px rgba(0, 0, 0, 0.8), 0 8px 30px rgba(0, 0, 0, 0.88)',
    transform: 'translateX(0%)',

    '&:focus': {
        outline: 'none' 
    },
});

export const DialogTitle = styled(Dialog.Title, {
    padding: '4.5rem 2rem 2rem 2rem',
    fontWeight: 500,
    color: '$grey100',
    fontSize: 20,
});

export const BagButton = styled('button', {
    position: 'relative',
    background: '$grey800',
    padding: '1rem',
    border: 0,
    borderRadius: 8,
    cursor: 'pointer',

    svg:{
        color: '$grey300'
    },

    span:{
        position: 'absolute',
        top: '-5px', 
        right: '-5px',
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
        background: '$green500',
        color: '$grey100',
        fontWeight: 'bold',
        fontSize: '1rem',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    '&:hover': {
        opacity: 0.8,
    }
});

export const IconButton = styled('button', {
    all: 'unset',
    fontFamily: 'inherit',
    borderRadius: '100%',
    height: 25,
    width: 25,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$grey300',
    position: 'absolute',
    top: 15,
    right: 15,
    cursor: 'pointer',

    '&:hover': { color: '$grey100' },
});
