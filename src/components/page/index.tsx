import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { usePageStyles } from './styles';

export default function Page({ children }: { children: React.ReactNode }) {
  const classes = usePageStyles();

  if(!children) {
    return null;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <div style={{ marginBottom: 50 }}>
          <Typography align="center" variant="h2">
            Messenger
          </Typography>
        </div>
        {children}
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="subtitle1" align="center">
            André Gomes - jsonplaceholder-messages
          </Typography>
        </Container>
      </footer>
    </div>
  );
}
