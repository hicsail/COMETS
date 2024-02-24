import { Drawer, 
        Typography,
        ListItem, 
        List, 
        Paper, 
        Grid, 
        Divider,
        Accordion,
        AccordionSummary,
        AccordionDetails,
        Button,
        Box
    } from '@mui/material';
import React, {useState, FC} from 'react';
import { MediaComponent } from '../components/MediaObject';
import { LayoutComponent } from '../components/LayoutObject';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Layout } from '../types/Layout';
import { Media } from '../types/Media';
import { MetabolicModel } from '../types/Model';
import { ModelComponent } from '../components/ModelObject';
import { SidebarCard } from '../components/SidebarObject';

const mediaOptions: Media[] = [
    {
        "name": "Core Glucose",
        "desc": "Example Desc for core glucose",
        "mainMetabolites": "Glucose",
        "min" : 1,
        "max" : 3
    },
    {
        "name": "Core Acetate",
        "desc": "Example Desc for core acetate",
        "mainMetabolites": "Acetate",
        "min" : 1,
        "max" : 3
    },
    {
        "name": "M9 Minimal Glucose",
        "desc": "Example Desc for m9 minimal glucose",
        "mainMetabolites": "Glucose",
        "min" : 1,
        "max" : 3
    },
    {
        "name": "M9 Minimal Acetate",
        "desc": "Example Desc for m9 minimal acetate",
        "mainMetabolites": "Acetate",
        "min" : 1,
        "max" : 3
    },
    {
        "name": "LB Rich",
        "desc": "Example Desc for LB Rich",
        "mainMetabolites": "Acetate",
        "min" : 1,
        "max" : 3
    }
]

const layoutOptions: Layout[] = [
    {
        "name": '9 cm Petri Dish (Center Colony)',
        "desc": 'Example description for center colony',
        "min": 1,
        "max": 12
    },
    {
        "name": '9 cm Petri Dish (Random Lawn)',
        "desc": 'Example description for random lawn',
        "min": 1,
        "max": 50
    },
    {
        "name": '10 ml Test Tube',
        "desc": 'Example description for test tube',
        "min": 1,
        "max": 50
    },
    {
        "name": 'EcoFab',
        "desc": 'Example description for EcoFab',
        "min": 1,
        "max": 50
    },
]

const modelOptions: MetabolicModel[] = [
    {
        "name": 'E. Coli Core',
        "desc": 'Example description for E. Coli Core model',
        "params": {
            "demographicNoise": false,
            "demographicNoiseAmplitude": 1,
            "uptakeVMax": 1,
            "uptakeKm": 1,
            "deathRate": 1,
            "biomassLinearDiffusivity": 1,
            "biomassNonlinearDiffusivity": 1
        }
    },
    {
        "name": 'E. Coli',
        "desc": 'Example description for E. Coli model',
        "params": {
            "demographicNoise": false,
            "demographicNoiseAmplitude": 1,
            "uptakeVMax": 1,
            "uptakeKm": 1,
            "deathRate": 1,
            "biomassLinearDiffusivity": 1,
            "biomassNonlinearDiffusivity": 1
        }
    },
    {
        "name": 'S. Enterica',
        "desc": 'Example description for S. Enterica model',
        "params": {
            "demographicNoise": false,
            "demographicNoiseAmplitude": 1,
            "uptakeVMax": 1,
            "uptakeKm": 1,
            "deathRate": 1,
            "biomassLinearDiffusivity": 1,
            "biomassNonlinearDiffusivity": 1
        }
    },
]

export function ExperimentSetupPage() {
    
    const [layoutExpanded, setLayoutExpanded] = React.useState<string | false>(false);
    const [mediaExpanded, setMediaExpanded] = React.useState<string | false>(false);
    const [modelExpanded, setModelExpanded] = React.useState<string | false>(false);

    const [modelChoice, setModelChoice] = useState<MetabolicModel[]>([])
    const [layoutChoice, setLayoutChoice] = useState<Layout>(layoutOptions[0])
    const [mediaChoice, setMediaChoice] = useState<Media>(mediaOptions[0])

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      if(panel === 'panel1'){
        setLayoutExpanded(isExpanded ? panel : false);
      }else if(panel === 'panel2'){
        setMediaExpanded(isExpanded ? panel : false);
      }else if(panel === 'panel3'){
        setModelExpanded(isExpanded ? panel : false);
      }   
    };

    const handleSubmit = () => {
        console.log(layoutChoice)
    }

    return (
        <>
        <Typography variant='h2' fontWeight={'bold'} sx={{justifyContent:'left', textAlign:'left' }}>
            1. PREPARE YOUR EXPERIMENT
        </Typography>
        <Typography variant='subtitle1' sx={{justifyContent:'left', textAlign:'left', paddingLeft:1 }}>
            Choose the model, layout, and media that you would like to simulate
        </Typography>

        <Grid container spacing={2} sx={{width:'80%'}}>
            <Grid item xs={6}>
                {/* <Paper style={{ padding: '20px', textAlign: 'center' }}>Item 3</Paper> */}
                <Accordion expanded={layoutExpanded === 'panel1'} onChange={handleAccordionChange('panel1')} sx={{marginTop:3}}> 
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{backgroundColor:'#CCCCFF'}}
                    >
                        <Typography>Layout</Typography>
                        <Divider variant='fullWidth'/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <LayoutComponent layoutOptions={layoutOptions} value={layoutChoice}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={mediaExpanded === 'panel2'} onChange={handleAccordionChange('panel2')} sx={{marginTop:3}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        sx={{backgroundColor:'#CCCCFF'}}
                    >
                        <Typography>Media</Typography>
                        <Divider variant='fullWidth'/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MediaComponent mediaOptions={mediaOptions} value={mediaChoice}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={modelExpanded === 'panel3'} onChange={handleAccordionChange('panel3')} sx={{marginTop:3}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        sx={{backgroundColor:'#CCCCFF'}}
                    >
                        <Typography>Model</Typography>
                        <Divider variant='fullWidth'/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ModelComponent value={modelChoice} modelOptions={modelOptions} modelLimit={3}/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ padding: '20px', textAlign: 'center' }}>Item 4</Paper>
            </Grid>
        </Grid>

        <Button onClick={handleSubmit}>Submit</Button>



        {/* Cart drawer on the right */}
        <Drawer variant='permanent' anchor='right' PaperProps={{sx: {backgroundColor: '#e9ecef', width:'15%', height: '100%'}}}>
            <Typography variant='h6' color={'black'} marginTop={10} fontFamily={'sans-serif'} sx={{ textDecoration:'underline'}}>
                Modal Selection
            </Typography>
            <Box sx={{width:'100%'}}>
                <SidebarCard/>
            </Box>
        </Drawer>
        </>
    )
    
}

