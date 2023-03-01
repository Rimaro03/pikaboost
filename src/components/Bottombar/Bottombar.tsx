import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material';

export default function Bottombar() {
	const theme = useTheme();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, zIndex: theme.zIndex.drawer + 1 }}>
				<Toolbar>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}