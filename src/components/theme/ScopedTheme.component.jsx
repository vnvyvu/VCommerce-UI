import { ScopedCssBaseline, ThemeProvider } from '@mui/material';

export function ScopedTheme({ theme, children }) {
    return (
        <ThemeProvider theme={theme}>
            <ScopedCssBaseline>
                {children}
            </ScopedCssBaseline>
        </ThemeProvider>
    );
}
