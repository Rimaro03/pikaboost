import { Box, Container, Typography } from '@mui/material';
import React from 'react';

export default function login(){
	return(
		<Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
			<Box sx={{border: '1px solid red', width: 'fit-content'}}>
				<Typography>PIKABOOST</Typography>
			</Box>
		</Container>
	);
}