import { MoreVert } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, ListItemAvatar, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const  millisToMinutesAndSeconds = (millis: number) => {
	const minutes: number = Math.floor(millis / 60000);
	const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default function TrackSmall({track}: any){
	return(
		<Paper elevation={3} sx={{
			backgroundColor: 'secondary',
			transition: 'transform .2s',
			':hover': {
				transform: 'scale(1.05)',
				cursor: 'pointer'
			},
			mt: 1,
		}}>
			<ListItem secondaryAction={
				<IconButton edge="end" aria-label="more">
					<MoreVert />
				</IconButton>
			}
			>
				<ListItemAvatar>
					<Avatar src={track.album.images[1].url} />
				</ListItemAvatar>
				<Box sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
					<Typography>{track.name}</Typography>
					<Typography color={'#6c757d'}>{millisToMinutesAndSeconds(track.duration_ms)}</Typography>
				</Box>
			</ListItem>
		</Paper>
	);
}