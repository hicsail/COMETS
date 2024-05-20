import { Box,
         Grid,
         Typography,
         ThemeProvider,
         createTheme } from "@mui/material";
import { useParams } from 'react-router-dom';

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

  return (
    <ThemeProvider theme={bodyTheme}>
      <Box
        component="main"
        sx={{
          position: "relative",
          height: "100vh",
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
            <Box sx={{width:'90vh', height: '25vh', backgroundColor:'#F1EDF6', marginLeft:5, padding: 5, paddingBottom: 0, paddingTop:2}}>
              <Typography
                variant='h1'
                textAlign={'left'}
                color={'black'}
                sx={{}}
              >
                Total Biomass (Escherichia coli Core)
              </Typography>
              <img
                src={`${import.meta.env.VITE_COMETS_FLASK}/result/${id}/biomass`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block' // Removes bottom space/gap
                }}
              />
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
              <img
                src={`${import.meta.env.VITE_COMETS_FLASK}/result/${id}/metabolite`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block' // Removes bottom space/gap
                }}
              />
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
              <img
                src={`${import.meta.env.VITE_COMETS_FLASK}/result/${id}/flux`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block' // Removes bottom space/gap
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
