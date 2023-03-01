import { Card, CardContent, CardMedia, Link, Typography } from '@mui/material';
import React from 'react';

export default function PlaylistLarge({playlist}: any){

	const findLinks = (text: string) => {
		const array = text.split('<a ');
		const elements: JSX.Element[] = [];
		array.forEach((item, index) => {
			if(item.startsWith('href')){
				array[index] = item.replace('"', '');
				let link = array[index].substring(array[index].indexOf('href=')+5, array[index].indexOf('>'));
				link = link.replace('"', '');
				const text = array[index].substring(array[index].indexOf('>')+1, array[index].indexOf('</a>'));
				console.log(array[index]);
				elements.push(
					<Link href={link} color={'#6c757d'} underline="hover">{text}, </Link>
				);
			}
			else{
				elements.push(<Typography variant="subtitle2" color={'#6c757d'} component='div' sx={{WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{array[index]}</Typography>);
			}
		});
		return elements;
	};

	const elements = findLinks(playlist.description);

	return(
		<Card sx={{
			padding: 2,
			backgroundColor: 'transparent',
			boxShadow: 'none',
			transition: 'transform .2s',
			width: 200,
			height: 310,
			':hover': {
				transform: 'scale(1.05)',
				cursor: 'pointer'
			},
		}}>
			<CardMedia 
				component={'img'}
				image={playlist.images[0].url}
				alt={playlist.name}
				sx={{
					borderRadius: 5
				}}
			/>
			<CardContent sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-start'				
			}}>
				<Typography variant="h6" component="div" fontWeight={'bold'} noWrap={true}>
					{playlist.name}
				</Typography>
				<Typography variant="subtitle2" height={'calc(2vh*3)'} >
					{elements.map((item, index)=>(
						item
					))}
				</Typography>
			</CardContent>
		</Card>
	);
}