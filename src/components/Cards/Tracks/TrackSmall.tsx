import { MoreVert, PlayArrow } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, ListItemAvatar, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Track } from 'spotify-types';

const  millisToMinutesAndSeconds = (millis: number) => {
	const minutes: number = Math.floor(millis / 60000);
	const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default function TrackSmall({track}: {track: Track}){
	const [trackIcon, setTrackIcon] = useState<JSX.Element>(<Avatar src={track.album.images[1].url} />);

	const handleMouseEnter = () => {
		setTrackIcon(
			<Avatar>
				<PlayArrow />
			</Avatar>
		);
	};

	const handleMouseLeave = () => {
		setTrackIcon(<Avatar src={track.album.images[1].url} />);
	};

	return(
		<Paper elevation={3} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{
			backgroundColor: 'secondary',
			transition: 'transform .2s',
			':hover': {
				transform: 'scale(1.05)',
				cursor: 'pointer'
			},
			mt: 1,
		}}
		>
			<ListItem secondaryAction={
				<IconButton edge="end" aria-label="more">
					<MoreVert />
				</IconButton>
			}
			>
				<ListItemAvatar>
					{trackIcon}
				</ListItemAvatar>
				<Box sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
					<Typography>{track.name}</Typography>
					<Typography color={'#6c757d'}>{millisToMinutesAndSeconds(track.duration_ms)}</Typography>
				</Box>
			</ListItem>
		</Paper>
	);
}