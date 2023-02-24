import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';
import SideDrawer from '../Drawer/SideDrawer';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.text.primary, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.text.primary, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '90%',
}));

const StyledInputBase = styled(InputBase)(() => ({
	color: 'inherit',
	flex: 1,
	margin: 6,
	marginLeft: 20,
	width: '100%',
}));
// eslint-disable-next-line @typescript-eslint/no-empty-function

export default function MobileAppbar() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('sm'));
	const matches2 = useMediaQuery(theme.breakpoints.up('sm'));
	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleDrawerClick = () => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="transparent">
				<Toolbar sx={{ display: 'flex', flexDirection: 'space-between' }}>
					{matches ? (
						<Typography
							variant="h4"
							fontWeight="bold"
							noWrap
							component="div"
							color="secondary"
							margin={2}
							width="50px"
						>
              P
						</Typography>
					) : (
						<Typography
							variant="h4"
							fontWeight="bold"
							noWrap
							component="div"
							color="secondary"
							width="200px"
						>
              Pickbook
						</Typography>
					)}
					<Search>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
						<IconButton
							type="button"
							sx={{ p: '10px' }}
							aria-label="search"
							disableRipple={true}
						>
							<SearchIcon />
						</IconButton>
					</Search>
					<IconButton onClick={handleDrawerClick}>
						<Menu />
					</IconButton>
				</Toolbar>
			</AppBar>
			<SideDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
		</Box>
	);
}
