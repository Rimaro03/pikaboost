import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, PaletteMode } from '@mui/material';
import { User } from '@/interfaces/User';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
interface userContext {
	userData: User,
	setUserData: Dispatch<SetStateAction<User>>
}

const emptyUser: User = {
	'country': '',
	'display_name': '',
	'email': '',
	'explicit_content': {
		filter_enabled: false,
		filter_locked: false
	},
	'external_urls': {},
	'followers': {
		'total': 0,
		'href': null
	},
	'href': '',
	'id': '',
	'images': [],
	'product': '',
	'type': '',
	'uri': ''
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const UserContext = createContext<userContext>({userData: emptyUser, setUserData: ()=>{} });

const getThemeOptions = (mode: PaletteMode) => ({
	palette: {
		mode: mode,
		primary: {
			main: '#2C63C8',
		},
		secondary: {
			main: '#fff',
		},
		error: {
			main: '#d32f2f',
		},
		warning: {
			main: '#ed6c02',
		},
		info: {
			main: '#0288d1',
		},
		success: {
			main: '#2e7d32',
		}
	},
	typography: {
		fontFamily: 'PlusJakartaSans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Cantarell,Helvetica Neue,Ubuntu,sans-serif',
	},
	components: {
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					backgroundColor: '-moz-initial',
				},
			}
		}
	}
});

export default function App({ Component, pageProps }: AppProps) {
	const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
	const [userData, setUserData] = useState(emptyUser);
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);

	const newTheme = React.useMemo(
		() =>
			createTheme(getThemeOptions(mode)),
		[mode],
	);
	return (
		<CookiesProvider>
			<ColorModeContext.Provider value={colorMode}>
				<UserContext.Provider value={{userData: userData, setUserData: setUserData}}>
					<ThemeProvider theme={newTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UserContext.Provider>
			</ColorModeContext.Provider>
		</CookiesProvider>
	);
}
