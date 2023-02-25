import { useRouter } from 'next/router';
import React, { useEffect } from 'react';  
import { useCookies } from 'react-cookie';

export async function getServerSideProps(context: any) {
	return {
		props: {params: JSON.parse(context.params.token)},
	};
}

export default function Token({params}: any){
	const router = useRouter();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

	useEffect(()=>{
		setCookie('access_token',params.access_token, {path: '/'});
		setCookie('refresh_token',params.refresh_token, {path: '/'});

		router.push('/');
	}, []);
		
	return(
		<p>Redirecting...</p>
	);
}