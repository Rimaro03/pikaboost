/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar/Appbar';
import { AppBar, Backdrop, Box, CircularProgress, Grid, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import PermanentDrawer from '@/components/Drawer/PermanentDrawer';
import Playlist from '@/components/Cards/Large/Playlist';
import Bottombar from '@/components/Bottombar/Bottombar';


export default function homepage() {
	const router = useRouter();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
	const [loading, setLoading] = useState(true);
	const [topPlaylists, setTopPlaylists] = useState([]);

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
	}, []);

	return (
		<Box>
			<Appbar />
			<PermanentDrawer />
			<Box ml={'300px'} mt={'5vh'} >
				<Typography variant='h4' fontWeight={'bold'}>Top playlists</Typography>
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
						<Grid container spacing={1}>
							{topPlaylists.map((item, index)=>(
								<Grid item key={index} xs={8} md={4} xl={2}>
									<Playlist playlist={item} key={index}/>
								</Grid>
							))}
						</Grid>
					</>
				}
			</Box>
			<Bottombar />
		</Box>
	);
}