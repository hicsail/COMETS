import {Box, 
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    RadioGroup,
    Radio,
    FormLabel,
    Grid
 } from '@mui/material';
import { FC, useState, ChangeEvent } from 'react';
import { MetabolicModel, ModelParams } from '../types/Model';

interface ModelComponentProps {
    modelOptions: MetabolicModel[]
    value: MetabolicModel[]
    modelLimit: number
}

const defaultParams: ModelParams = {
    "demographicNoise": false,
    "demographicNoiseAmplitude": '0',
    "uptakeVMax": '0',
    "uptakeKm": '0',
    "deathRate": '0',
    "biomassLinearDiffusivity": '0',
    "biomassNonlinearDiffusivity": '0'
}

export const ModelComponent: FC<ModelComponentProps> = (props) => {
const [selectedOption, setSelectedOption] = useState<MetabolicModel>(props.modelOptions[0]);
const [modelParams, setModelParams] = useState<ModelParams>(defaultParams);
const [textfieldError, setTextfieldError] = useState(false);
const [chosenModels, setChosenModels] = useState<{name: string; params: ModelParams}[]>([])
const handleCheckboxChange = (option: MetabolicModel) => {
    setSelectedOption(option);
};
const handleTextChange = (field: string, value:string) => {
    if((/^\d*$/.test(value))){
        setModelParams({...modelParams, [field]: value})
        setTextfieldError(false)
    }else{
        setTextfieldError(true)
    }
}

const handleRadioChange = (value:boolean) => {
    setModelParams({...modelParams, "demographicNoise": value})
}

const handleAddModel = (params: ModelParams, name: string) => {
    
    const model = {
        "name": name,
        "params": params
    }
    console.log(model)
    setChosenModels([...chosenModels, model])
}


return (
    <>
        <Box component="form" noValidate autoComplete="off" width={"100%"}>
            <FormGroup>
                {
                    props.modelOptions.map((option, index) => {
                        return(
                            <>
                                <FormControlLabel key={index} label={option.name} control={<Checkbox value={selectedOption} onChange={() => handleCheckboxChange(option)} checked={selectedOption === option}/>}/>
                                {
                                    selectedOption === option &&
                                    <>
                                        <Grid container spacing={2} sx={{width:'100%'}}>
                                            <Grid item xs={6} justifySelf={'flex-start'} alignSelf={'center'}>
                                            <FormLabel>Demographic Noise</FormLabel>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <RadioGroup>
                                                <FormControlLabel key={index} label='Yes' 
                                                        control={
                                                        <Radio
                                                            checked={modelParams.demographicNoise}
                                                            onChange={() => handleRadioChange(true)}
                                                            value={true}
                                                            name="demoNoise-radio-button-yes"
                                                            inputProps={{ 'aria-label': 'Yes' }}
                                                        />}
                                                /> 
                                                <FormControlLabel key={index} label='No' 
                                                        control={
                                                        <Radio
                                                            checked={!modelParams.demographicNoise}
                                                            onChange={() => handleRadioChange(false)}
                                                            value={false}
                                                            name="demoNoise-radio-button-no"
                                                            inputProps={{ 'aria-label': 'No' }}
                                                        />}
                                                />
                                            </RadioGroup>
                                            </Grid>
                                        </Grid>
                                        
                                        
                                        <TextField 
                                            variant='filled' 
                                            label='Demographic Noise Amplitude' 
                                            disabled={!modelParams.demographicNoise}
                                            value={modelParams.demographicNoiseAmplitude} 
                                            onChange={(event) => handleTextChange("demographicNoiseAmplitude", event.target.value)} 
                                            error={textfieldError}
                                            helperText={textfieldError ? 'Please input numbers only' : ''}
                                            sx={{marginTop:2}}
                                        />
                                        <TextField 
                                            variant='filled' 
                                            label='Uptake Vmax' 
                                            value={modelParams.uptakeVMax} 
                                            onChange={(event) => handleTextChange("uptakeVMax", event.target.value)} 
                                            error={textfieldError}
                                            helperText={textfieldError ? 'Please input numbers only' : ''}
                                            sx={{marginTop:2}}
                                            
                                        />
                                        <TextField 
                                            variant='filled' 
                                            label='Uptake Km' 
                                            value={modelParams.uptakeKm} 
                                            onChange={(event) => handleTextChange("uptakeKm", event.target.value)} 
                                            error={textfieldError}
                                            helperText={textfieldError ? 'Please input numbers only' : ''}
                                            sx={{marginTop:2}}
                                        />
                                        <TextField 
                                            variant='filled' 
                                            label='Death Rate' 
                                            value={modelParams.deathRate} 
                                            onChange={(event) => handleTextChange("deathRate", event.target.value)} 
                                            error={textfieldError}
                                            helperText={textfieldError ? 'Please input numbers only' : ''}
                                            sx={{marginTop:2}}
                                        />
                                        <TextField 
                                            variant='filled' 
                                            label='Biomass Linear Diffusivity' 
                                            value={modelParams.biomassLinearDiffusivity} 
                                            onChange={(event) => handleTextChange("biomassLinearDiffusivity", event.target.value)} 
                                            error={textfieldError}
                                            helperText={textfieldError ? 'Please input numbers only' : ''}
                                            sx={{marginTop:2}}
                                        />
                                        <TextField 
                                            variant='filled' 
                                            label='Biomass Non-Linear Diffusivity' 
                                            value={modelParams.biomassNonlinearDiffusivity} 
                                            onChange={(event) => handleTextChange("biomassNonlinearDiffusivity", event.target.value)} 
                                            error={textfieldError}
                                            helperText={textfieldError ? 'Please input numbers only' : ''}
                                            sx={{marginTop:2}}
                                        />
                                        <Button 
                                            sx={{marginTop:2}} 
                                            variant='outlined'
                                            disabled={chosenModels.length >= props.modelLimit} 
                                            onClick={() => handleAddModel(modelParams, option.name)}
                                        >
                                            ADD MODEL
                                        </Button>
                                    </>
                                }
                                
                            </>
                        )
                        })
                }
            </FormGroup>
        </Box>
    </>
)
}