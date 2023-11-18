import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MapContainer from './Components/MapContainer';
import MapContainer1 from './Components/MapContainer1';
import GridsWithHover from './Components/Grid';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Farming from './Components/Farming';

const useStyles = makeStyles(theme => ({
  appContainer: {
    height: '100vh', // Full viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box', // Include padding in height calculation
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
    margin: '20px', 
    
    marginBottom: '50px',// Add margin to create a gap around the container
  },
  content: {
    width: '100%',
    flex: '1', // Allow content to take remaining height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
    marginBottom: '50px',
    boxSizing: 'border-box', // Include padding in height calculation
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
 con: {
  marginLeft: '30px'
 }
}));


const App = () => {
  const classes = useStyles();

  return (
    <div >
      <Header/>
      <Farming/>
      <div className={classes.content}>
        <h1>Farming</h1>
        <p className={classes.con}>
          Talking lands refers to places where people communicate and interact with each other, often involving the use of language and speech. These can range from rural and urban areas to formal institutions like schools, offices, and homes. It can also refer to trade routes and cultural exchanges that occur between these lands. Talking lands often include elements of history, culture, and social dynamics, and can provide insights into the advancement of society and human interaction over time.
        </p>
      </div>
      <GridsWithHover/>
      <MapContainer style={{ flex: '1', padding: '30px', marginTop: '30px', marginBottom: '40px', paddingBottom: '50px' }} />
      <MapContainer1 style={{ flex: '1' }} />
      <Footer/>
    </div>
  );
};

export default App;
