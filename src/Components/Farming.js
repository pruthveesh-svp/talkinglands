import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import farmingImage from './Image/download (4).jpg'; 

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${farmingImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(10, 2),
    textAlign: 'center',
    color: '#fff',
    marginTop: '40px',
    height: '100%', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 1),
    },
  },
  title: {
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  description: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const FarmingSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h2" className={classes.title}>
        Farming and Agriculture
      </Typography>
      <Typography variant="body1" className={classes.description}>
        Exploring sustainable farming practices and the journey from farm to table.
      </Typography>
    </Box>
  );
};

export default FarmingSection;
