import React, { useEffect } from 'react';
import Appbar from '@/components/Appbar/Appbar';
import UserPage from '@/components/UserPage';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import PermanentDrawer from '@/components/Drawer/PermanentDrawer';


export default function homepage(){
	const router = useRouter();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

	useEffect(()=>{
		if(!cookies.access_token || !cookies.refresh_token){
			router.push('/login');
		}
	}, []);

	const drawerWidth = 240;
	return(
		<Box>
			<Appbar />
			<PermanentDrawer />
		</Box>
	);
}