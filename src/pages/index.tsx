/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Appbar from '@/components/Appbar/Appbar';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import PermanentDrawer from '@/components/Drawer/PermanentDrawer';
import { UserContext } from './_app';


export default function homepage(){
	const router = useRouter();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
	const [loading, setLoading] = useState(true);
	const {userData, setUserData} = React.useContext(UserContext);

	useEffect(()=>{
		if(!cookies.access_token || !cookies.refresh_token){
			router.push('/login');
		}
		fetch('http://localhost:3000/api/users/userData', {headers: {'access_token': cookies.access_token}})
			.then(res => {
				if(res.ok){
					return res.json();
				}
				throw res;
			})
			.then(data => setUserData(data))
			.catch(err => console.log(err))
			.finally(()=>{
				setLoading(false);
			});
	}, []);

	return(
		<Box>
			{loading ?
				<Backdrop open={loading}>
					<CircularProgress />
				</Backdrop>
				:
				<>
					<Appbar />
					<PermanentDrawer />
				</>
			}
		</Box>
	);
}