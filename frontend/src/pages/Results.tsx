import { Box,
         Grid,
         Typography,
         ThemeProvider,
         createTheme } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const bodyTheme = createTheme({
  typography: {
    h1: {
      fontSize: 45,
      fontWeight: 700
    },
    h2: {
      fontSize: 25,
      fontWeight: 600
    },
    h3: {
      fontSize: 18
    }
  }
});

export function ResultsPage() {
  const { id } = useParams()
  const [imageUrl, setImageUrl] = useState('');
  const [graphUrl, setGraphUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(true);
  const [modelList, setModelList] = useState([]);

  /*Pre-load information
    - List of all models in the simulation
    - List of all metabolites used
    - List of all fluxes generated

  */
  useEffect(() => {
    const urls = `${import.meta.env.VITE_COMETS_FLASK}/result/${id}/biomass`;
    const req_body = {
      model_name: 'Escherichia Coli Core',
      model_id: 'e_coli_core'
    }
    fetch(urls, 
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(req_body), // body data type must match "Content-Type" header
      })
      .then(response => {
        if(!response.ok){
          throw new Error('Network reponse failed');
        }
        return response.blob();
      })
      .then(blob => {
        const imageSrc = URL.createObjectURL(blob);
        setImageUrl(imageSrc)
        setImageLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
      
  })

  return (
    <ThemeProvider theme={bodyTheme}>
      <Box
        component="main"
        sx={{
          position: "relative",
          height: "200vh",
        }}
      >
        <Grid container spacing={1} flexDirection={'column'}>
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              direction="column"
              alignItems="left"
              style={{
                paddingLeft: '2vw',

              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: "black",
                  textAlign: "left",
                  paddingBottom: "10%",
                  paddingTop: "5%",
                }}
              >
                SIMULATION RUN RESULTS
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{width:'90vh', height: '40vh', backgroundColor:'#F1EDF6', marginLeft:5, padding: 5, paddingBottom: 0, paddingTop:2}}>
              <Typography
                variant='h1'
                textAlign={'left'}
                color={'black'}
                sx={{}}
              >
                Biomass (Escherichia coli Core)
              </Typography>
              {
                imageLoading ?
                <CircularProgress /> :
                <img
                  src={imageUrl}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block' // Removes bottom space/gap
                  }}
                />
             }
            </Box>
            <Box sx={{width:'90vh', height: '25vh', backgroundColor:'#F1EDF6', marginLeft:5, padding: 5, paddingBottom: 0, paddingTop:2}}>
              <Typography
                variant='h1'
                textAlign={'left'}
                color={'black'}
                sx={{}}
              >
                Metabolite (Glucose)
              </Typography>
              {/* <img
                src={`${import.meta.env.VITE_COMETS_FLASK}/result/${id}/metabolite`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block' // Removes bottom space/gap
                }}
              /> */}
            </Box>
            <Box sx={{width:'90vh', height: '25vh', backgroundColor:'#F1EDF6', marginLeft:5, padding: 5, paddingBottom: 0, paddingTop:2}}>
              <Typography
                variant='h1'
                textAlign={'left'}
                color={'black'}
                sx={{}}
              >
                Flux (Glucose)
              </Typography>
              {/* <img
                src={`${import.meta.env.VITE_COMETS_FLASK}/result/${id}/flux`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block' // Removes bottom space/gap
                }}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
