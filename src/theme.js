import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
            dark: '#1a237e',
            light: '#7986cb',
            contrastText: '#fff',
        },
        secondary: {
            main: '#7e8519',
        },
        error: {
            main: red.A400,
        },
        inherit: {
            main: '#fff',
            dark: '#fff',
            light: '#fff',
            contrastText: '#fff',
        },
    },
});

export default theme;