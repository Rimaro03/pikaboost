import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import DesktopAppbar from './DesktopAppbar';
import MobileAppbar from './MobileAppbar';

export default function Appbar(){
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	return(
		<>
			{!matches ? <DesktopAppbar /> : <MobileAppbar />}
		</>
	);
}