/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar/Appbar';
import { AppBar, Avatar, Backdrop, Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import PermanentDrawer from '@/components/Drawer/PermanentDrawer';
import Playlist from '@/components/Cards/Large/Playlist';
import Bottombar from '@/components/Bottombar/Bottombar';
import { MoreVert } from '@mui/icons-material';

const  millisToMinutesAndSeconds = (millis: number) => {
	const minutes: number = Math.floor(millis / 60000);
	const seconds: number = parseInt(((millis % 60000) / 1000).toFixed(0));
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export default function homepage() {
	const router = useRouter();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
	const [loading, setLoading] = useState(true);
	const [topPlaylists, setTopPlaylists] = useState([]);
	const [recentTracks, setRecentTracks] = useState([]);

	useEffect(() => {
		if (!cookies.access_token || !cookies.refresh_token) {
			router.push('/login');
		}
		fetch('http://localhost:3000/api/me/playlists?limit=6', { headers: { 'access_token': cookies.access_token } })
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw res;
			})
			.then(data => setTopPlaylists(data.items))
			.catch(err => console.log(err))
			.finally(() => {
				setLoading(false);
			});
		fetch('http://localhost:3000/api/me/recentTracks?limit=5', { headers: { 'access_token': cookies.access_token } })
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw res;
			})
			.then(data => setRecentTracks(data.items))
			.catch(err => console.log(err))
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<Box>
			<Appbar />
			<PermanentDrawer />
			<Box ml={'300px'} mr={'50px'} mt={'5vh'} >
				{loading ?
					<Grid container spacing={1} >
						<Grid item xs={8} md={4} xl={2}>
							<Skeleton variant='rectangular' width={220} height={350}/>
						</Grid>
						<Grid item xs={8} md={4} xl={2}>
							<Skeleton variant='rectangular' width={220} height={350}/>
						</Grid>
						<Grid item xs={8} md={4} xl={2}>
							<Skeleton variant='rectangular' width={220} height={350}/>
						</Grid>
						<Grid item xs={8} md={4} xl={2}>
							<Skeleton variant='rectangular' width={220} height={350}/>
						</Grid>
						<Grid item xs={8} md={4} xl={2}>
							<Skeleton variant='rectangular' width={220} height={350}/>
						</Grid>
					</Grid>
						
					:
					<>
						<Box>
							<Typography variant='h5' fontWeight={'bold'}>SAVED PLAYLISTS</Typography>	
							<Grid container spacing={2} mt={2}>
								{topPlaylists.map((item, index)=>(
									<Grid item key={index} xs={8} md={4} xl={2} width='min-content'>
										<Playlist playlist={item} key={index}/>
									</Grid>
								))}
							</Grid>
						</Box>
						<Box display={'flex'} justifyContent={'space-between'} mt={4}>
							<Box width={'40%'}>
								<Typography variant='h5' fontWeight={'bold'}>RECENTLY PLAYED</Typography>	
								<List>
									{recentTracks.map((item, index)=>(
										<Paper key={index} elevation={3} sx={{
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
													<Avatar src={item.track.album.images[1].url} />
												</ListItemAvatar>
												<Box sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
													<Typography>{item.track.name}</Typography>
													<Typography color={'#6c757d'}>{millisToMinutesAndSeconds(item.track.duration_ms)}</Typography>
												</Box>
											</ListItem>
										</Paper>
									))}
								</List>
							</Box>
							<Box>
								<Typography variant='h5' fontWeight={'bold'}>TOP CATEGORIES</Typography>	
								<Grid container spacing={2}>
									<Grid item xl={6}>
										<p>item</p>
									</Grid>
									<Grid item xl={6}>
										<p>item</p>

									</Grid>
									<Grid item xl={6}>
										<p>item</p>

									</Grid>
									<Grid item xl={6}>
										<p>item</p>

									</Grid>
								</Grid>
							</Box>
						</Box>
					</>
				}
			</Box>
			<Bottombar />
		</Box>
	);
}