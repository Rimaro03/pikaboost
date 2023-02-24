import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';  
import { useCookies } from 'react-cookie';

export async function getServerSideProps(context) {
	return {
		props: {params: JSON.parse(context.params.token)},
	};
}


export default function Token({params}){
	const router = useRouter();
	const [cookies, setCookie] = useCookies();

	useEffect(()=>{
		setCookie("access_token",params.access_token);
		setCookie("refresh_token",params.refresh_token);

		router.push('/');
	}, []);
		
	return(
		<p>{params.access_token}</p>
	);
}