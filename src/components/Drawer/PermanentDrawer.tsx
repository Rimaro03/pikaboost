import { Add, Explore, Favorite, Home, Search } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export default function PermanentDrawer(){
	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
		>

			<Toolbar />
			<List
				sx={{
					bgcolor: 'background.paper',
				}}
			>
				<Typography ml={2}>App</Typography>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Home /> 
						</ListItemIcon>
						<ListItemText primary={'Home'} />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Explore /> 
						</ListItemIcon>
						<ListItemText primary={'Explore'} />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Search /> 
						</ListItemIcon>
						<ListItemText primary={'Search'} />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Add /> 
						</ListItemIcon>
						<ListItemText primary={'Create Playlist'} />
					</ListItemButton>
				</ListItem>

				<Toolbar />
				<Typography ml={2}>Personal</Typography>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Favorite />
						</ListItemIcon>
						<ListItemText primary={'Favourite'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
  
	const anchor = 'left';
	return(
		<Drawer
			anchor={anchor}
			variant={'permanent'}
		>
			{list()}
		</Drawer>
	);
}