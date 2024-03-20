import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#00A0F7',
    },
    secondary: {
      main: '#f44336',
    },
    text: {
      primary: '#f1f1f1',
    },
    background: {
      paper: '#1C1C24',
      default: '#13131A',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#3E68A8',
          },
          '& label.Mui-focused': {
            color: '#3E68A8',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#3E68A8',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#3E68A8',
            },
            '&:hover fieldset': {
              borderColor: '#3E68A8',
              borderWidth: '0.15rem',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3E68A8',
            },
          },
        },
      },
    },
  },
});
