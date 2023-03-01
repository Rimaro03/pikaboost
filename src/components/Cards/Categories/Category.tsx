import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function Category({category}: any){
	return(
		<Grid item xl={6} sx={{
			transition: 'transform .2s',
			':hover': {
				transform: 'scale(1.05)',
				cursor: 'pointer'
			},
		}}>
			<Paper elevation={2}>
				<Box>
					<Typography padding={7} textAlign={'center'}>{category.name}</Typography>
				</Box>
			</Paper>
		</Grid>
	);
}