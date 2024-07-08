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
          Button
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
  const [selection, setSelection] = useState('biomass'); // selection for image (biomass/metabolite/flux)
  const [radioSelection, setRadioSelection] = useState(''); // holds value for radio button change for biomass model_id or metabolite metabolite_id
  const [modelSelection, setModelSelection] = useState(''); // holds value for radio button change ONLY for flux model_id
  const [fluxSelection, setFluxSelection] = useState('')
  const [graphSelection, setGraphSelection] = useState('total_biomass')
  
  
  const [allFluxes, setAllFluxes] = useState<{
    model_id: string,
    fluxes: string[]
  }[]>([])
  const [modelOption, setModelOption] = useState<{
    name: string,
    model_id: string
  }[]>([]);
  const [metaboliteOption, setMetaboliteOption] = useState<{
    name: string,
    id: string
  }[]>([]);
  const [fluxOptions, setFluxOptions] = useState<string[]>([])
  
  const graphOption = [
    'metabolite_time_series',
    'total_biomass'
  ]
  
  const selectOption = [
    "biomass",
    "metabolite",
    "flux"
  ]
  // Handlers
  const handleChange = (event: SelectChangeEvent) => {
    setSelection(event.target.value as string);
    console.log(metaboliteOption)
    setRadioSelection('')
  };

  const handleGraphChange = (event: SelectChangeEvent) => {
    setGraphSelection(event.target.value as string)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioSelection(event.target.value as string)
  }

  const handleFluxRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value as string;
    allFluxes.forEach((flux) => {
      const flux_arr: string[] = flux.fluxes
      if(String(flux.model_id) === model){
        setFluxOptions(flux_arr)
      }
    })
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
        flux_id: fluxSelection,
        model_name: 'Escherichia coli core',
        model_id: modelSelection
      }
    }else{
      console.log('cant find the right selection')
    }
    console.log(builtBody)
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
    .catch(() => {
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

  const handleFluxChange = (event: SelectChangeEvent) => {
    setFluxSelection(event.target.value as string);
  };
  
  useEffect(() => {

    const url = `${import.meta.env.VITE_COMETS_BACKEND}/job/${id}`
    let models;
    let metabolites;
    let req_body;
    fetch(url,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "origin-when-cross-origin",
      }
    )
    .then((response) => {
      if(!response.ok){
        throw new Error('Network reponse failed');
      }
      return response.json();
    })
    .then((data) => {
      models = data.model_info;
      metabolites = data.metabolites;
      // console.log(models)
      const fluxes = data.fluxes;
      setModelOption(models)
      setMetaboliteOption(metabolites)
      setAllFluxes(fluxes)
      req_body = {
        model_name: models ? models[0]['name'] : '' ,
        model_id: models ? models[0]['model_id'] : ''
      }
      const urls = `${import.meta.env.VITE_COMETS_FLASK}/result/${id}/biomass`;
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
      return;
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

  useEffect(() => {
    
  }, [])
  

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
                        modelOption.map((model, index) => (
                          <FormControlLabel key={index} value={model.model_id} label={`${model.name} (${model.model_id})`} control={<Radio onChange={handleRadioChange} defaultValue={''}/>} style={{color:'black'}}/>
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
                    <RadioGroup name="metabolite-radio-group">
                      {
                        metaboliteOption.map((metabolite, index) => (
                          <FormControlLabel key={index} value={metabolite.id} label={`${metabolite.name}`} control={<Radio onChange={handleRadioChange} defaultValue={''}/>} style={{color:'black'}}/>
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
                    <FormLabel>Which Model Do You Want To See?</FormLabel>
                    <RadioGroup name="model-radio-group">
                      {
                        modelOption.map((model, index) => (
                          <FormControlLabel key={index} value={model.model_id} label={`${model.name} (${model.model_id})`} control={<Radio onChange={handleFluxRadio} defaultValue={''}/>} style={{color:'black'}}/>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Which Flux Do You Want To See?</FormLabel>
                    <Select 
                      labelId="select-id"
                      id="simple-select-id"
                      value={radioSelection}
                      onChange={handleFluxChange}
                      sx={{width:'100%', textAlign:'left'}}
                    >
                      {fluxOptions.map((option, index) => (
                        <MenuItem value={option} key={index}>{option}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Box>
              }
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
              <Typography
                textAlign={'left'}
                paddingLeft={2.5}
                variant="h2"
                color={'black'}
              >
                Choose an graph to view
              </Typography>
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
