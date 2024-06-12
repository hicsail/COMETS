import {  Box,
          Grid,
          Typography,
          ThemeProvider,
          createTheme,
          Select,
          MenuItem,
          SelectChangeEvent,
          Radio,
          RadioGroup,
          FormControlLabel,
          FormControl,
          FormLabel,
          Button,
          InputLabel
        } from "@mui/material";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
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
  const [selection, setSelection] = useState('biomass');
  const [radioSelection, setradioSelection] = useState(''); // change name because model/metabolite/flux can use it
  const [modelSelection, setModelSelection] = useState(''); // only used when "flux" is chosen from dropdown
  const [graphSelection, setGraphSelection] = useState('total_biomass')

  const graphOption = [
    'metabolite_time_series',
    'total_biomass'
  ]
  
  const selectOption = [
    "biomass",
    "metabolite",
    "flux"
  ]

  const model_option = [
    "e_coli_core",
    "e_coli_core_2",
    "e_coli_core_3"
  ]

  const metabolite_option = [
    "oxygen",
    "phosphate",
    "ammonia",
    "glucose",
    "acetate",
    "glc__D_e",
    "EX_glc__D_e"
  ]

  // Handlers
  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value as string);
  };

  const handleGraphChange = (event: SelectChangeEvent) => {
    setGraphSelection(event.target.value as string)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setradioSelection(event.target.value as string)
  }

  const handleFluxRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModelSelection(event.target.value as string)
  }

  const handleButton = () => {
    const builtUrl = `${import.meta.env.VITE_COMETS_FLASK}/result/${id}/${selection}` 
    let builtBody;
    if(selection === 'biomass'){
      builtBody = {
        model_name: 'Escherichia coli core',
        model_id: radioSelection
      }
    }else if(selection === 'metabolite'){
      builtBody = {
        metabolite_name: 'Glucose',
        metabolite_id: radioSelection
      }
    }else if(selection === 'flux'){
      builtBody = {
        flux_name: 'Glucose',
        flux_id: radioSelection,
        model_name: 'Escherichia coli core',
        model_id: modelSelection
      }
    }else{
      console.log('cant find the right selection')
    }
    setImageLoading(true);
    fetch(builtUrl, {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "origin-when-cross-origin",
      body: JSON.stringify(builtBody)
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Network reponse failed');
      }
      return response.blob();
    })
    .then(blob => {
      const imageSrc = URL.createObjectURL(blob);
      setImageUrl(imageSrc);
      setImageLoading(false);
    })
    .catch((err) => {
      setImageLoading(false);
    } )
  }

  const handleGraphButton= () => {
    const builtUrl = `${import.meta.env.VITE_COMETS_FLASK}/result/graph/${id}/${graphSelection}` 
    setGraphLoading(true);
    fetch(builtUrl, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "origin-when-cross-origin"
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Network reponse failed');
      }
      return response.blob();
    })
    .then(blob => {
      const imageSrc = URL.createObjectURL(blob);
      setGraphUrl(imageSrc);
      setGraphLoading(false);
    })
    .catch((err) => {
      console.log(err)
    } )
    console.log('builtUrl: ', builtUrl);
  }


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

    //Fetch default graph
    

    // Fetching default image
    fetch(urls, 
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
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
        setImageUrl(imageSrc);
        setImageLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      
  },[])

  useEffect(() => {
    const graphUrl = `${import.meta.env.VITE_COMETS_FLASK}/result/graph/${id}/total_biomass` 
    //Fetch default graph
    fetch(graphUrl, 
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "origin-when-cross-origin", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      .then(response => {
        if(!response.ok){
          throw new Error('Network reponse failed');
        }
        return response.blob();
      })
      .then(blob => {
        const imageSrc = URL.createObjectURL(blob);
        setGraphUrl(imageSrc);
        setGraphLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
      
  },[])
  

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
                textAlign={'left'}
                paddingLeft={2.5}
                variant="h2"
                color={'black'}
              >
                Choose an image to view
              </Typography>
              <Box sx={{display:'flex', justifyContent:'space-between', padding:2}}>
                <Select 
                  labelId="select-id"
                  id="simple-select-id"
                  value={selection}
                  onChange={handleChange}
                  sx={{width:'70%', textAlign:'left'}}
                >
                  {selectOption.map((option, index) => (
                      <MenuItem value={option} key={index}>{option}</MenuItem>
                    )
                  )}
                </Select>
                <Button 
                    onClick={handleButton}
                    variant='outlined'
                    sx={{minWidth:'15%', maxWidth:'20%'}}
                >
                    APPLY
                </Button>
              </Box>
              { 
                selection === 'biomass' &&
                <Box sx={{textAlign:'left', padding:2.5}}>
                  <FormControl>
                    <FormLabel>Which Model Do You Want To See?</FormLabel>
                    <RadioGroup name="model-radio-group">
                      {
                        model_option.map((model, index) => (
                          <FormControlLabel key={index} value={model} label={model} control={<Radio onChange={handleRadioChange} defaultValue={''}/>} style={{color:'black'}}/>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Box>
              }
              { 
                selection === 'metabolite' &&
                <Box sx={{textAlign:'left', padding:2.5}}>
                  <FormControl>
                    <FormLabel>Which Metabolite Do You Want To See?</FormLabel>
                    <RadioGroup name="model-radio-group">
                      {
                        metabolite_option.map((metabolite, index) => (
                          <FormControlLabel key={index} value={metabolite} label={metabolite} control={<Radio onChange={handleRadioChange} defaultValue={''}/>} style={{color:'black'}}/>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Box>
              }
              { 
                selection === 'flux' &&
                <Box sx={{textAlign:'left', padding:2.5, display:'flex', justifyContent:'flex-start', gap: '5%'}}>
                  <FormControl>
                    <FormLabel>Which Flux Do You Want To See?</FormLabel>
                    <RadioGroup name="model-radio-group">
                      {
                        metabolite_option.map((metabolite, index) => (
                          <FormControlLabel key={index} value={metabolite} label={metabolite} control={<Radio onChange={handleRadioChange} defaultValue={''}/>} style={{color:'black'}}/>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Which Model Do You Want To See?</FormLabel>
                    <RadioGroup name="model-radio-group">
                      {
                        model_option.map((model, index) => (
                          <FormControlLabel key={index} value={model} label={model} control={<Radio onChange={handleFluxRadio} defaultValue={''}/>} style={{color:'black'}}/>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </Box>
              }
              <Typography
                variant='h1'
                textAlign={'left'}
                color={'black'}
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

            <Box sx={{width:'90vh', height: '40vh', backgroundColor:'#F1EDF6', marginLeft:5, padding: 5, paddingBottom: 10, paddingTop:30}}>
              <Box sx={{display:'flex', justifyContent:'space-between', padding:2}}>
              <Select 
                labelId="select-id"
                id="simple-select-id"
                value={graphSelection}
                label='Pick an image to generate'
                onChange={handleGraphChange}
                sx={{width:'70%', textAlign:'left'}}
              >
                {graphOption.map((option, index) => (
                    <MenuItem value={option} key={index}>{option}</MenuItem>
                  )
                )}
              </Select>
              <Button 
                    onClick={handleGraphButton}
                    variant='outlined'
                    sx={{minWidth:'15%', maxWidth:'20%'}}
                >
                    APPLY
              </Button>
              </Box>
              <Typography
                variant='h1'
                textAlign={'left'}
                color={'black'}
              >
                Total Biomass
              </Typography>
              {
                graphLoading ?
                <CircularProgress /> :
                <img
                  src={graphUrl}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'block' // Removes bottom space/gap
                  }}
                />
             }
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
