import {Box,
    TextField, 
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import { FC, useState, ChangeEvent } from 'react';

interface SidebarcardProps {
    label: string;
    
}


export const SidebarCard = () => {
    return (
        <Box sx={{width:'95%', marginLeft:1}}>
            <Card variant='outlined' >
                <CardContent>
                    <Typography variant='h6'></Typography>
                </CardContent>
            </Card>
        </Box>
    )

}