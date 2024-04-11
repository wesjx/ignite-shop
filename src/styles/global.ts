import { globalCss } from ".";

export const globalStyles = globalCss({
    '*': {
        padding: 0,
        margin: 0,
        boxSizing: 'border-box'
    },

    body: {
        backgroundColor: '$grey900',
        color: '$grey100',
        'webkt-font-smoothing': 'antialiased',
    },

    'body, input, textarea, button': {
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
})