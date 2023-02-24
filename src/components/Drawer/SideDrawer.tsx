import { AppbarDrawerProps } from '@/interfaces/Props';
import { Brightness4Rounded, Collections, GitHub, InsertPhoto, SupervisedUserCircle } from '@mui/icons-material';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export default function SideDrawer(props: AppbarDrawerProps){

	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
		>
			<Toolbar />
			<Divider />
			<List>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<InsertPhoto /> 
						</ListItemIcon>
						<ListItemText primary={'Photos'} />
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
			open={props.drawerOpen}
			onClose={()=>{props.setDrawerOpen(false);}}
		>
			{list()}
		</Drawer>
	);
}