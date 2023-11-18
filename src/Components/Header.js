import React from 'react';
import { makeStyles, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: theme.spacing(2, 0),
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  description: {
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Container>
        <Typography variant="h1" className={classes.title}>
          Farming and Crop Delivery
        </Typography>
        <Typography variant="body1" className={classes.description}>
          Exploring the world of agriculture and direct-to-consumer crop delivery
        </Typography>
      </Container>
    </header>
  );
};

export default Header;
