import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import Image1 from './Image/download (1).jpg'; 
import Image2 from './Image/download (2).jpg';
import Image3 from './Image/download (3).jpg';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    position: 'relative',
    marginBottom: '30px',
    borderRadius: 10,
    '&:hover $overlay': {
      opacity: 1,
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: '8px', 
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0, 
    },
    '&:hover': {
      opacity: 1,
    },
  },
  overlayText: {
    color: '#fff',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0, 
    },
  },
}));

const GridsWithHover = () => {
  const classes = useStyles();

  const imagesData = [
    {
      imageUrl: Image1, 
      text: ' Farming forms the backbone of food production, supplying essential nourishment to communities worldwide.',
    },
    {
      imageUrl: Image2,
      text: 'It plays a pivotal role in environmental conservation, fostering biodiversity, soil health, and sustainable land management practices.',
    },
    {
      imageUrl: Image3,
      text: ' Farming serves as an economic lifeline, providing livelihoods, fostering rural development, and contributing significantly to global economies.',
    },
  ];

  return (
    <Grid container spacing={3}>
      {imagesData.map((data, index) => (
        <Grid key={index} item xs={12} sm={4} className={classes.gridItem}>
          <img
            src={data.imageUrl}
            alt={`Image ${index + 1}`}
            className={classes.image}
          />
          <div className={classes.overlay}>
            <Typography variant="h6" className={classes.overlayText}>
              {data.text}
            </Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridsWithHover;
