import { Brightness4Rounded, Collections, GitHub, Home, InsertPhoto, SupervisedUserCircle } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import { alpha, Box } from '@mui/system';
import * as React from 'react';

export default function PermanentDrawer(){
	const theme = useTheme();
	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
		>
			<Toolbar />
			<List>
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
							<Collections /> 
						</ListItemIcon>
						<ListItemText primary={'Collections'} />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<SupervisedUserCircle /> 
						</ListItemIcon>
						<ListItemText primary={'Users'} />
					</ListItemButton>
				</ListItem>
				<Divider />
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<Brightness4Rounded />
						</ListItemIcon>
						<ListItemText primary={'Light mode'} />
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<GitHub />
						</ListItemIcon>
						<ListItemText primary={'Github'} />
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