import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: theme.spacing(3, 0),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0),
    },
  },
  text: {
    fontSize: '0.9rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <p className={classes.text}>© 2023 Farming Co. All Rights Reserved</p>
      <p className={classes.text}>Contact us: farmingco@example.com | Phone: 123-456-7890</p>
    </footer>
  );
};

export default Footer;
