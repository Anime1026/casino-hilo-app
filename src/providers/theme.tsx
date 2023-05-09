import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// ** Declare Theme Provider
const MaterialThemeProvider = ({ children }: { children: any }) => {
  const themeConfig = {
    typography: {
      fontSize: 14,
    },
  };
  const theme = createTheme(themeConfig);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MaterialThemeProvider;
