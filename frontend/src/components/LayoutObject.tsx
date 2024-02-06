import { Typography, Box, Card, TextField, Radio } from '@mui/material';
import React, { FC, useState } from 'react';

interface LayoutComponentProps {
    name: string;
    desc: string;
    metabolite: string;
    hidden: boolean
}

export const MediaComponent: FC<LayoutComponentProps> = (props) => {
    
    return (
        <>
            <Box component="form" noValidate autoComplete="off" hidden={props.hidden} width={"100%"}>
                {/* Input needs to be validated that it's within range and is strictly a number */}
                <TextField label={props.metabolite + ' concentration (mmol)'} variant='filled'/>
            </Box>
        </>
    )
}