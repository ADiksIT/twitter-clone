import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0c9ade',
    },
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.4)',
      },
    },
  },
})
