import { alpha, Box, ButtonBase, Container, ListItem, ListItemIcon, ListItemText, styled, SvgIcon, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function login(){
	const  theme = useTheme();
	const router = useRouter();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

	useEffect(()=>{
		if(cookies.access_token && cookies.refresh_token){
			router.push('/');
		}
	}, []);

	const BoxContainer = styled(Box)(()=>({
		backgroundColor: theme.palette.text.primary,
		width: 'fit-content',
		padding: 10,
		justifyContent: 'center',
		borderRadius: 10
	}));

	const LoginButton  = styled(ButtonBase)(()=>({
		borderRadius: 10,
		backgroundColor: alpha(theme.palette.primary.main, 1),
		'&:hover': {
			backgroundColor: alpha(theme.palette.primary.main, 0.8),
		},
	}));

	const SpotifyIcon = () => (
		<SvgIcon>
			<path fill="#1db954" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5c-.1-.4.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>
		</SvgIcon>
	);

	const handleLogin = () => {
		router.push('/api/auth/login');
	};

	return(
		<Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', height: '90vh'}}>
			<BoxContainer>
				<Typography variant="h4" textAlign={'center'} fontWeight={'bold'} margin={2}>PIKABOOST</Typography>
				<Box padding={1} display={'flex'} justifyContent={'center'} >
					<Typography textAlign={'center'}  width={'200px'}>Pikaboost is just a very cool spotify client, to use it you must first login with a valid spotify account</Typography>
				</Box>
				<Box margin={2}>
					<LoginButton onClick={handleLogin}>
						<ListItem>
							<ListItemIcon>
								<SpotifyIcon  />
							</ListItemIcon>
							<ListItemText primary={'Login with Spotify'} />
						</ListItem>
					</LoginButton>
				</Box>
			</BoxContainer>
		</Container>
	);
}