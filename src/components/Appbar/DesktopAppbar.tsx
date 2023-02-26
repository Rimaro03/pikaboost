/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, Menu, useTheme } from '@mui/material';
import { useState } from 'react';
import { ColorModeContext } from '@/pages/_app';
import { UserContext } from '@/pages/_app';
import { AccountCircle,ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import UserMenu from '../Menu/UserMenu';

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
	width: '50%',
}));

const StyledInputBase = styled(InputBase)(() => ({
	color: 'inherit',
	flex: 1,
	margin: 6,
	marginLeft: 20,
	width: '100%',
}));

const AppbarElementContainer = styled(Box)(({ theme })=>({
	display: 'flex',
	margin: 2,
	alignItems: 'center',
	':hover': {
		cursor: 'pointer',
		backgroundColor: alpha(theme.palette.text.primary, 0.15),
	},
	padding: 7,
	borderRadius: 10
}));

// eslint-disable-next-line @typescript-eslint/no-empty-function

export default function DesktopAppbar() {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);
	const {userData, setUserData} = React.useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [mode, setMode] = useState(theme.palette.mode);

	const handleModeChange = () => {
		colorMode.toggleColorMode();
		mode == 'dark' ? setMode('light') : setMode('dark');
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
		setMenuOpen(!menuOpen);
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuOpen(false);
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" color="transparent" sx={{ width: `calc(100% - ${240}px)`, ml: `${240}px` }}>
				<Toolbar sx={{justifyContent: 'space-around'}}>
					<Box sx={{display: 'flex', justifyContent: 'space-between' ,width: '50px'}}>
						<IconButton>
							<ArrowBackIosNew />
						</IconButton>
						<IconButton>
							<ArrowForwardIos />
						</IconButton>
					</Box>
					<Search>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
						<IconButton type="button" sx={{ p: '10px' }} aria-label="search" disableRipple={true}>
							<SearchIcon />
						</IconButton>
					</Search>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '300px' }} >
						<AppbarElementContainer onClick={handleModeChange}>
							{mode === 'light' ? 
								<Box sx={{display: 'flex', flexDirection: 'row'}}>
									<Brightness7Icon fontSize='large'/>
									<Typography margin={'auto'} ml={1}>Light</Typography>
								</Box>
								: <Box sx={{display: 'flex', flexDirection: 'row'}}>
									<Brightness4Icon fontSize='large'/>
									<Typography margin={'auto'} ml={1}>Dark</Typography>
								</Box>}
						</AppbarElementContainer >
						<AppbarElementContainer onClick={handleMenuOpen}>
							<AccountCircle fontSize='large' />
							<Typography margin={'auto'} ml={1}>{userData.id}</Typography>
						</AppbarElementContainer>
					</Box>
				</Toolbar>
			</AppBar>
			<Menu
				open={menuOpen}
				anchorEl={anchorEl}
				onClose={handleMenuClose}
			>
				<UserMenu />
			</Menu>
		</Box>
	);
}