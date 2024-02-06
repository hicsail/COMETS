import { Drawer, 
        Typography,
        ListItem, 
        List, 
        Paper, 
        RadioGroup, 
        Radio, 
        FormControl, 
        Grid, 
        FormLabel, 
        FormControlLabel,
        Box,
        Divider
    } from '@mui/material';
import React, {useState, FC} from 'react';
import { MetabolicModel } from '../types/Model';
import { MediaComponent } from '../components/MediaObject';


interface FormProps {
    label: string[];
    category: string;
}



const MediaLabels = ['Core Glucose', 'Core Acetate', 'M9 Minimal Glucose', 'M9 Minimal Acetate', 'LB Rich']
const LayoutLabels = ['9 cm Petri Dish (Center Colony)', '9 cm Petri Dish (Random Lawn)', '10lm Test Tube', 'EcoFab']

const ExperimentForm: FC<FormProps> = (props) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [textFieldInput, setTextFieldInput] = useState('');
    const [textInputs, setTextInputs] = useState<{ [key: string]: string }>({});
    const options = props.label
    const helperHandleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
      };
    
      const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>, option:string) => {
        setTextInputs({ ...textInputs, [option]: event.target.value });
        setTextFieldInput(event.target.value)
        console.log(textFieldInput)
        // setMediaConcentration(textInputs)
      };
    return (
        <>
        <Box width={'100%'} height={'5vh'} sx={{backgroundColor:'#6B68FF'}}>
                <Typography color={'black'} fontWeight={'bold'} variant='h3' textAlign={'left'} sx={{paddingTop:1, paddingLeft:2}}>{props.category}</Typography>
        </Box>
        <Box width={'100%'} textAlign={'left'} sx={{backgroundColor:'white', paddingTop:2}}>
            <FormControl component="fieldset">
            <RadioGroup
            aria-label="options"
            name="options"
            value={selectedOption}
            onChange={helperHandleRadioChange}
            sx={{justifyItems:'left', width:'160%'}}
            >
                {
                    options.map((option,index) => (
                        <Box sx={{backgroundColor:'white', paddingLeft:2, paddingBottom:2}} width={'100%'} key={index}>
                        <FormControlLabel 
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{color:'black'}}
                        />
                        {selectedOption && <MediaComponent name={option} desc={option} metabolite={option} hidden={selectedOption !== option}/>}
                        <Divider variant='middle'/>
                        </Box>

                    ))
                }
            </RadioGroup>
        </FormControl>  
      </Box>
      </>
    );
}

export function ExperimentSetupPage() {
    const [modelSelection, setModelSelection] = useState<MetabolicModel[]>([])
    return (
        <>
        <Typography variant='h2' fontWeight={'bold'} sx={{justifyContent:'left', textAlign:'left' }}>
            1. PREPARE YOUR EXPERIMENT
        </Typography>
        <Typography variant='subtitle1' sx={{justifyContent:'left', textAlign:'left', paddingLeft:1 }}>
            Choose the model, layout, and media that you would like to simulate
        </Typography>

        <Grid container spacing={2} sx={{width:'80%'}}>
            {/* First row */}
            <Grid item xs={6}>
                <ExperimentForm label={MediaLabels} category='Media'/>
            </Grid>
            <Grid item xs={6}>
                {/* <ExperimentForm label={LayoutLabels} category='Layout' /> */}
            </Grid>
            {/* Second row */}
            <Grid item xs={6}>
                <Paper style={{ padding: '20px', textAlign: 'center' }}>Item 3</Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ padding: '20px', textAlign: 'center' }}>Item 4</Paper>
            </Grid>
        </Grid>
        {/* Cart drawer on the right */}
        <Drawer variant='permanent' anchor='right' PaperProps={{sx: {backgroundColor: '#e9ecef', width:'15%', height: '100%'}}}>
            <Typography variant='h6' color={'black'} marginTop={10} fontFamily={'sans-serif'} sx={{ textDecoration:'underline'}}>
                Modal Selection
            </Typography>
            <List sx={{alignContent: 'center', justifyContent: 'center'}}>
                {modelSelection.map((model) => 
                    <ListItem key={model.name} sx={{padding: '2px'}}>
                        <Paper elevation={5} variant='outlined' square={true} sx={{width:'90%'}}>
                            {model.name}
                        </Paper>  
                    </ListItem>
                )}
            </List>

        </Drawer>
        </>
    )
    
}

