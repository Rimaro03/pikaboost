/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar/Appbar';
import { AppBar, Avatar, Backdrop, Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import PermanentDrawer from '@/components/Drawer/PermanentDrawer';
import PlaylistLarge from '@/components/Cards/Playlist/PlaylistLarge';
import Bottombar from '@/components/Bottombar/Bottombar';
import { MoreVert } from '@mui/icons-material';
import TrackSmall from '@/components/Cards/Tracks/TrackSmall';

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
										<PlaylistLarge playlist={item} key={index}/>
									</Grid>
								))}
							</Grid>
						</Box>
						<Box display={'flex'} justifyContent={'space-between'} mt={4}>
							<Box width={'40%'}>
								<Typography variant='h5' fontWeight={'bold'}>RECENTLY PLAYED</Typography>	
								<List>
									{recentTracks.map((item, index)=>(
										<TrackSmall track={item.track} index={index} key={index}/>
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