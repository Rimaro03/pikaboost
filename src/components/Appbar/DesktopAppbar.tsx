import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton, useTheme } from '@mui/material';
import { useState } from 'react';
import { ColorModeContext } from '@/pages/_app';

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

const AppbarElement = styled(Typography)(()=>({
	fontWeight: 600,
	fontSize: 16,
}));

const AppbarElementContainer = styled(Box)(()=>({
	display: 'flex',
	margin: 'auto',
	alignItems: 'center',
	':hover': {
		cursor: 'pointer'
	}
}));

// eslint-disable-next-line @typescript-eslint/no-empty-function

export default function DesktopAppbar() {
	const theme = useTheme();
	const colorMode = React.useContext(ColorModeContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="transparent">
				<Toolbar sx={{justifyContent: 'space-between'}}>
					<Typography
						variant="h4"
						fontWeight="bold"
						noWrap
						component="div"
						color="secondary"
						sx={{ display: { xs: 'none', sm: 'block' } }}
						width="200px"
					>
						Pickbook
					</Typography>
					<Search>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
						<IconButton type="button" sx={{ p: '10px' }} aria-label="search" disableRipple={true}>
							<SearchIcon />
						</IconButton>
					</Search>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '350px' }} >
						<AppbarElementContainer onMouseEnter={handleMouseEnter}>
							<AppbarElement>Explore</AppbarElement>
							{anchorEl ? 
								<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
							}
						</AppbarElementContainer>
						<AppbarElementContainer onClick={colorMode.toggleColorMode}>
							<AppbarElement>{theme.palette.mode} mode</AppbarElement>
							<IconButton sx={{ ml: 1 }} color="inherit">
								{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
							</IconButton>
						</AppbarElementContainer >
						<AppbarElementContainer sx={{backgroundColor: theme.palette.secondary.main, padding: 1, ml: 0.5, borderRadius: 2}}>
							<Typography color={'white'}>GitHub</Typography>
						</AppbarElementContainer>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}